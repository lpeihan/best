import { TOKEN_NAME } from './constants';
import storage from './storage';

export function setToken(token) {
  storage.setItem(TOKEN_NAME, token);
}

export function getToken() {
  return storage.getItem(TOKEN_NAME);
}

export function isLogin() {
  return getToken();
}

export function clearToken() {
  storage.removeItem(TOKEN_NAME);
}
