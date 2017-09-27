import { createStore, compose, applyMiddleware } from 'redux';
import {rootReducer, enhancer as routerEnhancer, middleware as routerMiddleware} from '../reducers/rootReducer';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const handleHotModule = store => {
  if (module.hot) {
    module.hot.accept('../reducers/rootReducer', () => {
      const nextRootReducer = require('../reducers/rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }
};

function baselineMiddleware() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  if (process.env.REACT_APP_REDUX_LOGGING_ENABLED === 'false') {
    return applyMiddleware(thunkMiddleware, routerMiddleware);
  }

  return composeEnhancers(applyMiddleware(thunkMiddleware, createLogger(), routerMiddleware));
}

export default initialState => {
  const enhancers = compose(routerEnhancer, baselineMiddleware());
  const store = createStore(
    rootReducer, 
    initialState,
    enhancers
  );

  handleHotModule(store);
  return store;
};
