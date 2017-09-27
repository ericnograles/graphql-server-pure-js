import { combineReducers } from 'redux';
import { auth } from './auth';
import { user } from './user';
import { routerForBrowser } from 'redux-little-router';
import { ROUTES as routes } from '../routes';

export const { reducer, middleware, enhancer } = routerForBrowser({routes});
export const rootReducer = combineReducers({
  user,
  auth,
  router: reducer
});
