import cookie_js from 'cookie_js';

const TokenKey = 'access_token';

export function setToken(token) {
  return cookie_js.set(TokenKey,token);
}
export function getToken() {
  return cookie_js.get(TokenKey);
}