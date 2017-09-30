import React from 'react';
import ReactDOM from 'react-dom';
import './common/assets/styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Apollo
import { getOperationAST } from 'graphql';
import { ApolloClient, ApolloProvider } from 'react-apollo';
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from 'subscriptions-transport-ws';
import { ApolloLink, HttpLink, WebSocketLink } from 'apollo-link';

// Redux
import { Provider } from 'react-redux';
import { initializeCurrentLocation } from 'redux-little-router';
import configureStore from './common/store/configureStore';
const store = configureStore();

// redux-little-router boilerplate
const initialLocation = store.getState().router;
if (initialLocation) {
  store.dispatch(initializeCurrentLocation(initialLocation));
}

// GraphQL via Apollo
const graphQLUri = process.env.REACT_APP_API_ROOT;
const httpLink = new HttpLink({ uri: graphQLUri });
const link = ApolloLink.split(operation => {
  const operationAST = getOperationAST(
    operation.query,
    operation.operationName
  );
  return !!operationAST && operationAST.operation === 'subscription';
}, httpLink);
const client = new ApolloClient({ networkInterface: httpLink });

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
