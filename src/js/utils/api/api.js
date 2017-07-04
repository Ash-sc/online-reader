import utils from '../utils';

const API_ROOT = '/api';

function callApi(args) {
  let endpoint = args.endpoint;
  const reqMethod = args.method;
  const data = args.data || {};

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  const fetchArgs = {
    credentials: 'include',
    method: reqMethod,
    headers: {},
  };

  if (reqMethod !== 'GET') {
    fetchArgs.body = JSON.stringify(data);
    fetchArgs.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'X-XSRF-TOKEN': utils.getCookie('XSRF-TOKEN'),
    };
  }

  endpoint = API_ROOT + endpoint;

  return fetch(endpoint, fetchArgs)
    .then((response) => {
      if (response.status === 200) {
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json();
        }
        return response.text();
      }

      if (response.status === 401) {
        delete localStorage.token;
        delete localStorage.orgId;
        window.location.href = '/';
      }
      if (response.status === 417) {
        return response.text().then(r => Promise.reject(r));
      }
      if (response.status === 500) {
        return Promise.reject('系统错误!');
      }

      return Promise.reject(response);
    });
}

export default class Api {
  static get(endpoint) {
    return callApi({
      endpoint,
      method: 'GET',
    });
  }

  static post(endpoint, data) {
    return callApi({
      endpoint,
      method: 'POST',
      data,
    });
  }

  static put(endpoint, data) {
    return callApi({
      endpoint,
      method: 'PUT',
      data,
    });
  }

  static delete(endpoint, data) {
    return callApi({
      endpoint,
      method: 'DELETE',
      data,
    });
  }
}
