export const getUrlParams = function(){
  const _url = window.location.href;
  const _urlParams = _url.match(/([?&])(.+?=[^&]+)/igm);
  return _urlParams ? _urlParams.reduce((a, b) => {
    const value = b.slice(1).split('=');
    // @ts-ignore
    a[value[0]] = value[1]
    return a;
  }, {}) : {};
}

export default {
  getUrlParams
}