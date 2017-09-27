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
* (TODO) Uses [jest](https://facebook.github.io/jest/) for unit testing
* Includes [create-react-app](https://github.com/facebookincubator/create-react-app) as a client-side SPA
* Supports [Visual Studio Code](https://code.visualstudio.com/) development out of the box

## Demo

* [Login](https://graphql-baseline-dev.herokuapp.com/explorer?operationName=loginAsUser&query=mutation%20loginAsUser%20%7B%0A%20%20login(%0A%20%20%20%20email%3A%20%22enograles%2Bgraphql.primary%40appirio.com%22%2C%0A%20%20%20%20password%3A%20%22P%40ssword!1%22%0A%20%20)%20%7B%0A%20%20%20%20token%0A%20%20%20%20expires%0A%20%20%20%20refresh_token%2C%0A%20%20%20%20profile%20%7B%0A%20%20%20%20%20%20first_name%0A%20%20%20%20%20%20last_name%0A%20%20%20%20%20%20email%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D)
* [Register a User](https://graphql-baseline-dev.herokuapp.com/explorer?operationName=newUser&query=mutation%20newUser%20%7B%0A%20%20createUser(user%3A%20%7B%0A%20%20%20%20first_name%3A%20%22From%22%2C%0A%20%20%20%20last_name%3A%20%22Graphiql%22%2C%0A%20%20%20%20email%3A%20%22from%40graphiql.org%22%2C%0A%20%20%20%20password%3A%20%22password%22%0A%20%20%7D)%20%7B%0A%20%20%20%20first_name%2C%0A%20%20%20%20last_name%2C%0A%20%20%20%20email%0A%20%20%7D%0A%7D)
* [Find a User By Email](https://graphql-baseline-dev.herokuapp.com/explorer?query=query%20findUser%20%7B%0A%20%20user(email%3A%20%22enograles%2Bgraphql.primary%40appirio.com%22)%20%7B%0A%20%20%20%20first_name%2C%0A%20%20%20%20last_name%2C%0A%20%20%20%20email%0A%20%20%7D%0A%7D&operationName=findUser)

## Local Development Infrastructure

* Uses [docker-compose.yaml](https://docs.docker.com/compose/) for local development infrastructure scaffold
* Postgres is published on port 61001 and redis on 61000, respectively

## Prerequisites

1. Node v6 or higher ([Node Version Manager](https://github.com/creationix/nvm) highly recommended)
    * **Note**: The `package.json` is configured to run on Node 8.x on Heroku
1. [Docker](https://www.docker.com/)
1. `npm install -g yarn`

## Environment Variables

You will need to create a .env file at the root of this repo with the environment variables below defined.

**Note**: .env files, like .pem files or anything secure, must never be added to source control

| Environment Variable Name  | Purpose | Sample Value |
| ------------- | ------------- | ------------- |
| DATABASE_URL  | The URI to your Postgres database  | `postgres://postgres@127.0.0.1:61001/graphql-baseline` |
| REDIS_URL  | The URI to your redis instance  | `redis://127.0.0.1:61000` |
| REDIS_USER_TOKENS_DB  | The redis DB index where to store JWT's  | `1` |
| API_SECRET  | The secret with which to sign JWT's  | `shhh_this_should_be_secure` |
| RECREATE_SCHEMA | If set to true, will drop and recreate all Sequelize Models' source tables | `true` |

## Installation

1. Clone this repo
1. `yarn install`
1. `cd graphql-baseline-docker && ./scaffold_local_database.sh && cd ..`
1. `yarn run build && yarn start`
1. Open browser to `http://localhost:60000/explorer` to launch GraphiQL
1. Open browser to `http://localhost:60000` to launch `create-react-app` SPA

## Debugging (Client)

1. Open the root of this repo
1. In a terminal, type in `cd client`
1. `yarn run start`

## Debugging (Server)

### WebStorm or IntelliJIDEA

1. Open the root of this repo
1. In your Run Configurations, select `graphql-baseline` and press the debug button
    * **Note**: If you would like "hot reloads" in WebStorm or IntelliJIDEA, please be sure to install and enable [LiveEdit](https://www.jetbrains.com/help/idea/live-edit.html)

### Visual Studio Code

1. Open the root of this repo
1. In the Debug screen, select the `graphql-baseline` launch task and press the debug button

#### Nodemon Debugging for Non-Webstorm/IntelliJIDEA Editors

Optionally, you can run nodemon.  Nodemon will automatically restart the GraphQL server on any changes, similar to the LiveEdit plugin that jetBrains offers.

1. Open the root of this repo.
1. In a terminal, execute `yarn run nodemon`
1. In VS Code, select the `Attach to Nodemon` launch task and press the Start Debugging button

## Creating a New GraphQL Scaffold

1. `git clone https://github.com/appirio-digital/ads-baseline-graphql.git my_project_folder_here`
1. `cd my_project_folder_here`
1. `rm -rf .git`
1. `git init`
1. `git add .`
1. `yarn install`
1. `git commit -m "my client's scaffold"`
1. `git remote add origin https://github.com/my-client-github-org-here/my_project_repo_here.git`
1. `yarn init`
1. Define your project name, version, licensing, repo location from above, etc
1. `git push -u origin master`

## Deploying to Heroku

This project fully supports deployment to a Heroku web dyno.  The only items needed to be established are the environment variables listed above.
