import * as React from 'react';
import * as moment from 'moment';

import cancel from '../static/images/cancel.svg';
import {IStoreState, ITransaction} from "../configureStore";
import {IThunkDispatch} from "../actions";
import {connect} from "react-redux";

const getToField = (transaction: any) => {
    if (!transaction) {
        return '';
    }
    if (transaction.recipientAddress && transaction.data) {
        return `Contract: ${transaction.recipientAddress}`;
    }
    if (!transaction.recipientAddress) {
        return 'Smart contract deploy';
    }
    return transaction.recipientAddress;
}

const getTransactionInfo = (transaction: any) => {
    if (!transaction) {
        return [];
    };
    return [
        {
            title: 'hash',
            value: transaction.hash
        },
        {
            title: 'status',
            value: transaction.status ? 'Success' : 'Failed'
        },
        {
            title: 'block',
            value: transaction.blockHash
        },
        {
            title: 'date',
            value: moment.utc(transaction.timestamp).format('YYYY-MM-DD, HH:mm:ss z')
        },
        {
            title: 'from',
            value: transaction.senderAddress
        },
        {
            title: 'to',
            value: getToField(transaction)
        },
        {
            title: 'amount',
            value: transaction.amount
        },
        {
            title: 'results',
            value: null
        }
    ]
};

interface IProps {
    title: string
    subTitle?: string
    list: any[]
    transactionResults?: any[]
    closePopup(): void
}

const InfoPopup = ({title, subTitle, list, closePopup, transactionResults}: IProps) => {
    return (
        <div className="popup-area">
            <div className="info-popup">
                <div className="close-popup" onClick={closePopup}>CLOSE <img src={cancel} alt="close" /></div>

                <h2 className="main-title">{title}</h2>
                <h3 className="subtitle">{subTitle}</h3>
                {
                    list.map(i => (
                        <div key={i.value + Math.random()} className="info">
                            <span className="title">{i.title}</span>
                            <span>{i.value}</span>
                        </div>
                    ))
                }

                <div className="transaction-result-wrapper">
                    {
                        transactionResults && transactionResults.map((item, index) =>
                            <div className="transaction-result-block" key={index}>
                                <div className="results-info"><span className="results-title">from: </span><span>{item.from}</span></div>
                                { item.to && <div className="results-info"><span className="results-title">to: </span><span>{item.to}</span></div> }
                                <div className="results-info"><span className="results-title">amount: </span><span>{item.amount}</span></div>
                                { item.data && <div className="results-info"><span className="results-title">data: </span><span>{item.data}</span></div> }
                            </div>)
                    }
                </div>
            </div>
        </div>
    )
}

class TransactionInfo extends React.Component<any, any> {

    public render() {
        const title = 'transaction info';

        if (!this.props.transaction) {
            return null;
        }
        const listInfo = getTransactionInfo(this.props.transaction);

        return (
            <>
                <InfoPopup title={title} list={listInfo} closePopup={this.props.closePopup} transactionResults={this.props.transaction.results}/>
            </>

        )
    }

}
const mapStateToProps = ({ transaction }: IStoreState) => ({ transaction });

const mapDispatchToProps = (dispatch: IThunkDispatch, getState: (() => IStoreState)) => ({
});

interface IStoreStateProps {
    transaction: ITransaction | null;
}

const TransactionInfoPopup = connect<IStoreStateProps>(
    mapStateToProps,
    mapDispatchToProps
)(TransactionInfo);
export default TransactionInfoPopup;
