import {baseUrl} from './config';

export const request = function ({
  url =  '',
  method = 'get',
  headers = {
    'content-type': 'application/json'
  },
  data = {
  }
}) {

  if (method) {
    method = String(method).toLocaleLowerCase()
  }

  if (!headers['content-type']) {
    headers['content-type'] = 'application/json';
  }

  return fetch(`${baseUrl}${url}`, {
    method,
    headers,
    body: JSON.stringify(data),
  });
}

export default request;