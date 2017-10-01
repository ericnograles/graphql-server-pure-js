import React from 'react';
import ReactDOM from 'react-dom';
import './common/assets/styles/index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// Apollo
import { ApolloClient, ApolloProvider } from 'react-apollo';
import { createNetworkInterface } from 'apollo-client'; 
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

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
const wsClient = new SubscriptionClient(process.env.REACT_APP_WS_ROOT, {
  reconnect: true
});

const networkInterface = createNetworkInterface({
  uri: process.env.REACT_APP_API_ROOT
});

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
);

const client = new ApolloClient({ networkInterface: networkInterfaceWithSubscriptions });

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
