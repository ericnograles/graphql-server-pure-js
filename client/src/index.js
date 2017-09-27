import React from 'react';
import ReactDOM from 'react-dom';
import './common/assets/styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import { initializeCurrentLocation } from 'redux-little-router';
import configureStore from './common/store/configureStore';
const store = configureStore();

// redux-little-router boilerplate
const initialLocation = store.getState().router;
if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation));
}

// GraphQL via Apollo
const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_API_ROOT
});

const client = new ApolloClient({networkInterface});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
