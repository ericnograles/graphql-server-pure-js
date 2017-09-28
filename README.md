# REST in Peace: The Rise of GraphQL

## Overview

With [GraphQL](http://graphql.org/) starting to take off in popularity, the intent of this baseline is to provide an example for anyone who is considering GraphQL for their problem domain or is simply experimenting.

GraphQL provides an expressive, declarative way to define data.  Combined with tools from [Apollo](http://dev.apollodata.com/), it provides an easier way to consume, mutate, and subscribe to data from an API.  Buying into the GraphQL stack means no more confusion around:

* How does the client dynamically get data it needs without one-off routes or janky query handling?
* What is the best XHR client to use for data management?
* How does one effectively cache data client side?
* How does one effectively subscribe to data changes on the client side?

Instead of a traditionally imperative way to obtain data, using GraphQL largely follows a declarative model similar to React: the front-end is focused on the "what" versus the "how"

## Approach

* Uses [Express](https://expressjs.com/) and [graphql-server-express](https://github.com/apollographql/graphql-server)
* Uses [babel](https://babeljs.io/docs/usage/cli/) by default for Express to enable truly "Universal JavaScript" on the front-end and backend
* Uses [Sequelize](http://docs.sequelizejs.com/) for "code-first" ORM/data modeling
* Uses [Knex](http://knexjs.org/) for "database-first" querying
* Uses [redis](https://github.com/NodeRedis/node_redis) for distributed session management
* Uses [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) for JWT and refresh token generation
* Uses [bcrypt](https://github.com/kelektiv/node.bcrypt.js) for localized password hashing
* Uses [jest](https://facebook.github.io/jest/) for unit testing
* Includes [create-react-app](https://github.com/facebookincubator/create-react-app) as a client-side SPA
* Supports [Visual Studio Code](https://code.visualstudio.com/) development out of the box

## Prerequisites

1. [Docker](https://www.docker.com/)
1. [Visual Studio Code](https://code.visualstudio.com/)

## Environment Variable Reference

**Note**: The docker-compose.yml defines all of these in relation to this app's `Dockerfile`. This is simply for reference if you want to run this locally.

| Environment Variable Name  | Purpose | Sample Value |
| ------------- | ------------- | ------------- |
| DATABASE_URL  | The URI to your Postgres database  | `postgres://postgres@127.0.0.1:61001/graphql-baseline` |
| REDIS_URL  | The URI to your redis instance  | `redis://127.0.0.1:61000` |
| REDIS_USER_TOKENS_DB  | The redis DB index where to store JWT's  | `1` |
| API_SECRET  | The secret with which to sign JWT's  | `shhh_this_should_be_secure` |
| RECREATE_SCHEMA | If set to true, will drop and recreate all Sequelize Models' source tables | `true` |

## Installation

1. Clone this repo
1. At the root of the repo, execute `docker-compose build`
1. At the root of the repo, execute `docker-compose up`
1. Browse to `http://localhost:64002/explorer` for the GraphiQL server running on Node
1. Browse to `http://localhost:64003` for the React SPA

## Debugging (Client)

1. Browse to `http://localhost:64003` for the React SPA
1. Open Chrome DevTools and debug like a normal SPA
    * **Note**: Any changes to `client/src` will reflect on the Docker container

## Debugging (Server)

1. Open VS Code
1. Execute the `Attach to Nodemon` task
1. Place breakpoints in any files under `server`
    * **Note**: Any changes to `server` will reflect on the Docker container

## Deploying to Heroku

This project fully supports deployment to a Heroku web dyno.  The only items needed to be established are the environment variables listed above.
