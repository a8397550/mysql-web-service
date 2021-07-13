import {baseUrl} from './config';

export const joinUrl = (uri: string, params: any = {}) => {
  let url = uri;
  if (url.indexOf('?') === -1) {
    url += '?';
  }

  Object.keys(params || {}).forEach((key, index) => {
    if (index === 0) {
      url += `${key}=${params[key]}`;
      return;
    }
    url += `&${key}=${params[key]}`;
  });

  return url;
};

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
    method = String(method).toLocaleUpperCase()
  }

  if (!headers['content-type']) {
    headers['content-type'] = 'application/json';
  }

  if (method === 'GET') {
    let uri = `${baseUrl}${url}`;
    if (Object.keys(data).length) {
      uri = joinUrl(uri, data);
    }

    return fetch(uri, {
      method,
      headers,
    }).then(res => res.json());
  }

  return fetch(`${baseUrl}${url}`, {
    method,
    headers,
    body: JSON.stringify(data)
  }).then(res => res.json());
}

export default request;