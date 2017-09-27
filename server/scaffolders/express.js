'use strict';
import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'graphql-server-express';
import winston from 'winston';
import packageJson from '../../package.json';
import schema from '../api';
import sequelize from '../services/sequelize';
import { Models as models, Migrations } from '../models';
import knex from '../services/knex';
import identifyUser from '../middleware/identifyUser';
import path from 'path';
import cors from 'cors';

export default async () => {
  try {
    const app = express();

    await sequelize.sync({ force: process.env.RECREATE_SCHEMA === 'true' });
    winston.info(`Database initialized`);

    // CORS
    app.use(cors());

    // Client-side SPA
    app.use(express.static(path.resolve('./client/build')));
    app.use((req, res, next) => {
      // Any route aside from /api and /explorer gets sent to the client
      if (['/api', '/explorer'].indexOf(req.path) < 0) {
        return res
          .set('Content-Type', 'text/html')
          .sendFile(path.resolve('./client/build/index.html'));
      }
      next();
    });

    // Migrations
    await Migrations.MigratePermission();
    await Migrations.MigrateUser();

    // Configure GraphQL and GraphiQL
    app.use(
      '/api',
      [bodyParser.json(), identifyUser],
      graphqlExpress({
        schema,
        debug: process.env.NODE_ENV !== 'production',
        graphiql: true,
        rootValue: {
          headers: (args, req) => {
            return req.headers;
          },
          query: (args, req) => {
            return req.query;
          }
        },
        context: {
          models,
          knex
        }
      })
    );

    app.use(
      '/explorer',
      graphiqlExpress({
        endpointURL: '/api'
      })
    );

    // Spin up Express
    let port = process.env.PORT || 9000;
    await app.listen(port);
    winston.info(`${packageJson.name} started on port ${port}`);
    return app;
  } catch (ex) {
    winston.error(ex);
  }
};
