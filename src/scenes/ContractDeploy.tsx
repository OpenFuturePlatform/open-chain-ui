import * as React from 'react';
import {connect} from 'react-redux';
import {IThunkDispatch} from '../actions';
import {createTransaction, estimation} from '../actions/transactions';
import {IStoreState, ITransactionCandidate, IWallet} from '../configureStore';
import {getNumbersOnly} from '../utils/getNumbersOnly';
import {ErrorField, parseApiError} from '../utils/parseApiError';
import {getWalletByPrivateKey} from '../actions/wallet';
import {Password} from "../components-ui/Password";
import {TransactionConfirm} from "../components/TransactionConfirm";
import {ErrorPopup} from "../components/ErrorPopup";

interface IStoreStateProps {
    wallet: IWallet | null;
}

interface IDispatchProps {
    createTransaction(transaction: ITransactionCandidate): void;

    getWalletByPrivateKey(privateKey: string): Promise<void>;
}

type IProps = IStoreStateProps & IDispatchProps;

interface IState {
    previewPopup: boolean;
    recipientAddress: string;
    data: string;
    amount: string;
    fee: string;
    amountError: string;
    recipientError: string;
    isShowError: boolean;
    errorPopupMessage: string;
    key: string;
    keyError: string;
    isLoginShown: boolean;
    isFormShown: boolean;
}

export class ContractDeployComponent extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = this.getDefaultState();
    }

    public componentDidMount(): void {
        window.addEventListener('message', (event: any) => {
            const byteCode = event.data.byteCode;

            if (byteCode === undefined || byteCode === null) {
                return;
            }

            this.deployContract(byteCode);
        });
    };

    public getDefaultState = () => ({
        amount: '',
        amountError: '',
        fee: '',
        previewPopup: false,
        recipientAddress: '',
        data: '',
        recipientError: '',
        isShowError: false,
        errorPopupMessage: '',
        key: '',
        keyError: '',
        isLoginShown: false,
        isFormShown: false
    });

    public isConfirmDisabled = () =>
        // !this.state.amount ||
        !this.state.fee || (!this.state.recipientAddress && !this.state.data);

    public getTransactionCandidate = () => ({
        amount: Number(this.state.amount),
        fee: Number(this.state.fee),
        recipientAddress: this.state.recipientAddress || null,
        data: this.state.data || null
    });

    public showPreviewPopup = (e?: React.FormEvent | React.MouseEvent) => {
        if (e) {
            e.preventDefault();
        }
        this.setState(() => ({previewPopup: true}));
    };
    public hidePreviewPopup = () => this.setState(() => ({previewPopup: false}));

    public onAddressChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        this.setState({recipientAddress: e.target.value});

    public onDataChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        this.setState({data: e.target.value});

    public onKeyChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        this.setState({key: e.target.value});

    public onLoginClick = async (): Promise<void> => {
        const {key} = this.state;
        const keyError = this.getKeyError(key);
        if (keyError) {
            return this.setState({keyError});
        }
        try {
            await this.props.getWalletByPrivateKey(key);
            this.setState({isLoginShown: true});
            this.setState({keyError: ''});
            this.setState({key: ''});
        } catch (e) {
            this.setState({keyError: parseApiError(e).message});
        }
    };

    public onAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const initial = e.target.value || '';
        const amount = getNumbersOnly(initial);
        this.setState({amount});
    };

    public onFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const initial = e.target.value || '';
        const fee = getNumbersOnly(initial);
        this.setState({fee});
    };

    public onCloseError = () => this.setState({isShowError: false});

    // 123
    public onConfirm = async (): Promise<void> => {
        try {
            const {key} = this.state;
            const keyError = this.getKeyError(key);
            await this.props.getWalletByPrivateKey(key);

            const transaction = this.getTransactionCandidate();
            await this.props.createTransaction(transaction);
            this.setState(this.getDefaultState());
        } catch (e) {
            const {message, field} = parseApiError(e);
            this.setState({previewPopup: false});
            switch (field) {
                case ErrorField.RECIPIENT:
                    this.setState({recipientError: message});
                    throw e;
                case ErrorField.AMOUNT:
                    this.setState({amountError: message});
                    throw e;
                default:
                    this.setState({errorPopupMessage: message, isShowError: true});
                    throw e;
            }
        }
    };

    public getKeyError = (key: string) => {
        if (key.length !== 64) {
            return 'Private Key needs to include 64 symbols';
        }
        const spaces = key.split('').filter(it => it === ' ');
        if (spaces.length === 64) {
            return 'Invalid Private Key';
        }
        return '';
    };

    public onEstimateClick = async (): Promise<void> => {
        try {
            const data = {
                recipientAddress: this.state.recipientAddress ? this.state.recipientAddress : null,
                data: this.state.data
            };

            const response = await estimation(data);
            this.setState({fee: response.data.payload, recipientError: ''})
        } catch (e) {
            const {message, field} = parseApiError(e);
            this.setState({previewPopup: false});
            switch (field) {
                case ErrorField.RECIPIENT:
                    this.setState({recipientError: message});
                    throw e;
                default:
                    this.setState({errorPopupMessage: message, isShowError: true});
                    throw e;
            }
        }
    };

    public deployContract = async (byteCode: string): Promise<void> => {
        try {
            const data = {
                recipientAddress: null,
                data: byteCode
            };
            const response = await estimation(data);
            this.setState({fee: response.data.payload, recipientError: ''})
            this.setState({isLoginShown: true});

        } catch (e) {
            this.setState({errorPopupMessage: "Invalid bytecode", isShowError: true});
            throw e;
        }
    };

    public render() {
        const {recipientAddress, amount, fee, recipientError, amountError, previewPopup, isShowError, errorPopupMessage, data} = this.state;
        const {wallet} = this.props;
        const {key, keyError, isLoginShown, isFormShown} = this.state;
        const senderAddress = wallet ? wallet.address : '';
        const confirmDisabled = this.isConfirmDisabled();
        const transactionCandidate: ITransactionCandidate = this.getTransactionCandidate();

        return (
            <section>
                <div className="form-content">
                    {isFormShown &&
                    <div>
                        <form className="create-transaction">

                            <h3>Deploy Contract</h3>
                            <br/><br/>

                            <div className="input">
                                <p>From</p>
                                <input type="text" placeholder="Wallet Address" className="disable"
                                       value={senderAddress}
                                       readOnly={true}/>
                            </div>
                            <div className={`input`}>
                                <p>Bytecode</p>
                                <div className={`input data-input-block`}>
                                    <input
                                        type="text"
                                        placeholder="Bytecode"
                                        required={false}
                                        value={data}
                                        onChange={this.onDataChange}
                                    />
                                    <div onClick={this.onEstimateClick}
                                         className={`button mini ${!data ? 'disable' : ''}`}>
                                        <div/>
                                        <span>estimate</span>
                                    </div>
                                </div>

                            </div>
                            {/*<div className={`input ${amountError && 'invalid'}`}>*/}
                            {/*    <p className="required">Amount</p>*/}
                            {/*    <span className="error">{amountError}</span>*/}
                            {/*    <input type="text" placeholder="Amount" required={true} value={amount} onChange={this.onAmountChange} />*/}
                            {/*</div>*/}
                            <div className={`input ${amountError && 'invalid'}`}>
                                <p className="required">Fee {data &&
                                <span className='input-fee-tip'> Remember to estimate </span>} </p>
                                <input type="text" placeholder="Fee" required={true} value={fee}
                                       onChange={this.onFeeChange}
                                       readOnly={true}/>
                            </div>
                            <button className={`button mini ${confirmDisabled ? 'disable' : ''}`}>
                                <div/>
                                <span>deploy</span>
                            </button>
                        </form>
                    </div>
                    }

                    {isLoginShown &&
                    <form>
                        <h3>Enter private key</h3>
                        <br/><br/>

                        <div className={`input input-enter-key ${keyError && 'invalid'}`}>
                            <p className="required">private key</p>
                            <span className="error">{keyError}</span>
                            <Password password={key} placeholder="Private Key" onChange={this.onKeyChange}/>
                        </div>

                        <button
                            className="button mini"
                            type="button"
                            onClick={this.onLoginClick}>
                            <div/>
                            <span>Login</span>
                        </button>
                    </form>
                    }

                    <TransactionConfirm
                        address={wallet ? wallet.address : ''}
                        transaction={transactionCandidate}
                        isVisible={previewPopup}
                        onClose={this.hidePreviewPopup}
                        onSubmit={this.onConfirm}
                    />
                    <ErrorPopup isVisible={isShowError} errorMessage={errorPopupMessage}
                                onClose={this.onCloseError}/>

                </div>
            </section>
        );
    }
}

const mapStateToProps = ({wallet}: IStoreState) => ({wallet});

const mapDispatchToProps = (dispatch: IThunkDispatch) => ({
    createTransaction: (transaction: ITransactionCandidate) => dispatch(createTransaction(transaction)),
    getWalletByPrivateKey: (privateKey: string) => dispatch(getWalletByPrivateKey(privateKey))
});

export const ContractDeploy = connect<IStoreStateProps, IDispatchProps>(
    mapStateToProps,
    mapDispatchToProps
)(ContractDeployComponent);
