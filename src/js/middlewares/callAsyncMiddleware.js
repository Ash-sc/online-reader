export default function callAsyncMiddleware({ dispatch, getState }) {
  return next => (action) => {
    const {
      types,
      callAPI,
      shouldCallAPI = () => true,
      payload = {},
    } = action;

    if (!types) {
      // Normal action: pass it on
      return next(action);
    }

    if (
      !Array.isArray(types) ||
      types.length !== 3 ||
      !types.every(type => typeof type === 'string')
    ) {
      throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
      throw new Error('Expected callAPI to be a function.');
    }

    if (!shouldCallAPI(getState())) {
      return next(action);
    }

    const [requestType, successType, failureType] = types;

    dispatch(Object.assign({}, payload, {
      status: 'loading',
      type: requestType,
    }));

    return callAPI().then(
      response => dispatch(Object.assign({}, payload, {
        status: 'ok',
        data: response,
        type: successType,
      })),
      error => dispatch(Object.assign({}, payload, {
        status: 'error',
        data: error,
        type: failureType,
      }))
    );
  };
}
