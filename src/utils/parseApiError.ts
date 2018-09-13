export enum ErrorField {
  RECIPIENT = 'recipientAddressError',
  AMOUNT = 'amountError'
}

export const transactionErrorMap = {
  INCORRECT_ADDRESS: { field: ErrorField.RECIPIENT, message: 'Transaction recipient address is incorrect' },
  INCORRECT_DELEGATE_KEY: { field: ErrorField.RECIPIENT, message: 'Delegate node id is incorrect' },
  INCORRECT_HASH: { field: ErrorField.RECIPIENT, message: 'Transaction hash is incorrect' },
  INCORRECT_SIGNATURE: { field: ErrorField.RECIPIENT, message: 'Transaction signature is incorrect' },
  INCORRECT_VOTES_COUNT: { field: ErrorField.RECIPIENT, message: 'Votes number is incorrect' },
  ALREADY_VOTED_FOR_DELEGATE: { field: ErrorField.RECIPIENT, message: 'This node is already a delegate' },
  INSUFFICIENT_ACTUAL_BALANCE: {
    field: ErrorField.AMOUNT,
    message: 'Insufficient actual balance'
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
    if (e.response.data.payload.type !== undefined) {
      const type = e.response.data.payload.type || '';
      const transactionMap = transactionErrorMap[type] || null;
      const message = transactionMap ? transactionMap.message : e.response.data.payload.message;
      const field: ErrorField = transactionMap ? transactionMap.field : null;

      return { message, field };
    } else {
      const message = e.response.data.payload[0].message;
      const field: string = e.response.data.payload[0].field + 'Error';

      return { message, field };
    }
  }
  return { message: defaultMessage };
};
