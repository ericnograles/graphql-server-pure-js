import * as UserActions from '../actions/user';

const initialState = {
  first_name: null,
  last_name: null,
  email: null
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case UserActions.RECEIVE_PROFILE:
      return receiveProfile(state, action);
    default:
      return state;
  }
};

function receiveProfile(state, action) {
  return Object.assign({}, state, {
    ...action.data
  });
}
