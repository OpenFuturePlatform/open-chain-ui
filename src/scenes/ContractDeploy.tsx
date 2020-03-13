import * as React from 'react';
import {connect} from 'react-redux';
import {IThunkDispatch} from '../actions';
import {createTransaction, estimation} from '../actions/transactions';
import {IStoreState, ITransactionCandidate, IWallet} from '../configureStore';
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
}

export class ContractDeployComponent extends React.Component<IProps, IState> {
    public constructor(props: IProps) {
        super(props);
        this.state = this.getDefaultState();
    }

    public componentDidMount(): void {
        window.addEventListener('message', (event: any) => {
            this.handleEvent(event);
        });

        window.onscroll = () => {
            window.scrollTo(0, document.body.scrollHeight);
        };
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
        isLoginShown: false
    });

    public getPostMessageData = () => ({
        hash: '',
        blockHash: '',
        senderAddress: '',
        senderPublicKey: '',
        timestamp: '',
        error: {}
    });

    public getTransactionCandidate = () => ({
        amount: Number(this.state.amount),
        fee: Number(this.state.fee),
        recipientAddress: this.state.recipientAddress || null,
        data: this.state.data || null
    });

    public handleEvent = (event: any) => {
        const byteCode = event.data.byteCode;

        if (byteCode === undefined || byteCode === null) {
            return;
        }

        this.prepareContractDeploying(byteCode);
    };

    public hidePreviewPopup = () => {
        this.setState(() => ({previewPopup: false}));
        this.postSuccessfulMessage();
        this.scrollToBottom();
    };

    public onKeyChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        this.setState({key: e.target.value});

    public onAuthorizeClick = async (): Promise<void> => {
        const {key} = this.state;
        const keyError = this.getKeyError(key);

        if (keyError) {
            this.postFailMessage(keyError);
            return this.setState({keyError});
        }

        try {
            await this.props.getWalletByPrivateKey(key);
            this.setState({isLoginShown: false});
            this.setState({keyError: ''});
            this.setState({previewPopup: true});
            this.scrollToBottom();
        } catch (e) {
            this.setState({keyError: parseApiError(e).message});
            this.scrollToBottom();
            this.postFailMessage(parseApiError(e).message);
        }
    };

    public onCloseError = () => this.setState({isShowError: false});

    public onConfirm = async (): Promise<void> => {
        try {
            const {key} = this.state;
            await this.props.getWalletByPrivateKey(key);
            const transaction = this.getTransactionCandidate();
            await this.props.createTransaction(transaction);
            this.setState(this.getDefaultState());
            this.scrollToBottom();
            this.postSuccessfulMessage();
        } catch (e) {
            const {message, field} = parseApiError(e);
            this.setState({previewPopup: false});
            this.scrollToBottom();
            this.postFailMessage(message);
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

    public postSuccessfulMessage = () => {
        const data = this.getPostMessageData();
        // data.hash = ;
        // data.blockHash = ;
        // data.senderAddress = ;
        // data.senderPublicKey = ;
        // data.timestamp = ;
        this.postMessage(data);
    };

    public postFailMessage = (err: string) => {
        const data = this.getPostMessageData();
        data.error = err;
        this.postMessage(data);
    };

    public postMessage = (data: any) => {
        setTimeout(() => {
            window.top.postMessage(data, '*');
        }, 1000);
    };

    public scrollToBottom = () => {
        window.scrollTo(0, document.body.scrollHeight);
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

    public prepareContractDeploying = async (byteCode: string): Promise<void> => {
        try {
            const data = {
                recipientAddress: null,
                data: byteCode
            };
            const response = await estimation(data);
            this.setState({fee: response.data.payload, recipientError: ''});
            this.setState({data: byteCode});
            this.setState({isLoginShown: true});
        } catch (e) {
            this.setState({errorPopupMessage: 'Invalid bytecode', isShowError: true});
            this.postFailMessage('Invalid bytecode');
            this.scrollToBottom();
            throw e;
        }
    };

    public render() {
        const {previewPopup, isShowError, errorPopupMessage} = this.state;
        const {wallet} = this.props;
        const {key, keyError, isLoginShown} = this.state;
        const transactionCandidate: ITransactionCandidate = this.getTransactionCandidate();

        return (
            <section>
                <div className="form-content">

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
                            onClick={this.onAuthorizeClick}>
                            <div/>
                            <span>Authorize</span>
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
