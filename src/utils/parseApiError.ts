export enum ErrorField {
  RECIPIENT = 'recipientAddressError',
  AMOUNT = 'amountError'
}

export const transactionErrorMap = {
  INCORRECT_ADDRESS: { field: ErrorField.RECIPIENT, message: 'Transaction recipient address is incorrect' },
  INCORRECT_DELEGATE_KEY: { field: ErrorField.RECIPIENT, message: 'Delegate address is incorrect' },
  INCORRECT_HASH: { field: ErrorField.RECIPIENT, message: 'Transaction hash is incorrect' },
  INCORRECT_SIGNATURE: { field: ErrorField.RECIPIENT, message: 'Transaction signature is incorrect' },
  INCORRECT_VOTES_COUNT: { field: ErrorField.RECIPIENT, message: 'Votes number is incorrect' },
  INSUFFICIENT_BALANCE: {
    field: ErrorField.AMOUNT,
    message: 'Account balance is insufficient'
  }
};

interface IApiError extends Error {
  response: {
    data: {
      payload: {
        message: string;
        type?: ErrorField;
      };
    };
  };
}

type IError = IApiError | Error;

export const parseApiError = (e: IError) => {
  const defaultMessage = 'Something went wrong';
  if ('response' in e) {
    const type = e.response.data.payload.type || '';
    const transactionMap = transactionErrorMap[type] || null;
    const message = transactionMap ? transactionMap.message : e.response.data.payload.message;
    const field: ErrorField = transactionMap ? transactionMap.field : null;

    return { message, field };
  }
  return { message: defaultMessage };
};
