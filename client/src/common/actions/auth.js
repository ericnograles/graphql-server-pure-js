import { LOCAL_STORAGE } from '../constants';

export const RECEIVE = 'AUTH:RECEIVE';
export const IMPERSONATE = 'AUTH:IMPERSONATE';
export const LOGOUT = 'AUTH:LOGOUT';

export function receive(token, refreshToken, permissions = {}) {
  localStorage[LOCAL_STORAGE.ACCESS_TOKEN] = token;
  localStorage[LOCAL_STORAGE.REFRESH_TOKEN] = refreshToken;
  return {
    type: RECEIVE,
    data: {
      token,
      refreshToken,
      permissions
    }
  };
}

export function impersonate(token, refreshToken) {
  return {
    type: IMPERSONATE,
    data: {
      token,
      refreshToken
    }
  };
}

export function logout() {
  delete localStorage[LOCAL_STORAGE.ACCESS_TOKEN];
  delete localStorage[LOCAL_STORAGE.REFRESH_TOKEN];
  return {
    type: LOGOUT
  };
}