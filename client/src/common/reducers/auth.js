import * as AuthActions from '../actions/auth';

const initialState = {
  token: null,
  refreshToken: null,
  impersonatedToken: null,
  impersonatedRefreshToken: null,
  permissions: {} // TODO: A hashtable of app-specific permissions a user has access to
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case AuthActions.RECEIVE:
      return receive(state, action);
    case AuthActions.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

function receive(state, action) {
  return Object.assign({}, state, {
    ...action.data
  });
}
