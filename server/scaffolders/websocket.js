import { createServer } from 'http';
import schema from '../api';
import { execute, subscribe } from 'graphql';
import { SubscriptionServer } from 'subscriptions-transport-ws';

const WS_PORT = process.env.WS_PORT || 9001;

export default async () => {
  try {
    // Create WebSocket listener server
    const websocketServer = createServer((request, response) => {
      response.writeHead(404);
      response.end();
    });

    // Bind it to port and start listening
    websocketServer.listen(WS_PORT, () =>
      console.log(
        `Websocket Server is now running on http://localhost:${WS_PORT}`
      )
    );

    const subscriptionServer = SubscriptionServer.create(
      {
        schema,
        execute,
        subscribe
      },
      {
        server: websocketServer,
        path: '/graphql'
      } //
    );
  } catch (err) {
    console.error(err);
  }
};
