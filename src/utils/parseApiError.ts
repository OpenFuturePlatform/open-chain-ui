interface IApiError extends Error {
  response: {
    data: {
      payload: {
        message: string;
      };
    };
  };
}

type IError = IApiError | Error;

export const parseApiError = (e: IError) => {
  const defaultMessage = 'Something went wrong';
  if ('response' in e) {
    return e.response.data.payload.message;
  }
  return defaultMessage;
};
