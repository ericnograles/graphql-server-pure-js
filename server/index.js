import {} from 'dotenv/config';
import 'babel-polyfill';
import winston from 'winston';
import scaffoldExpress from './scaffolders/express';
import scaffoldWebSockets from './scaffolders/websocket';

// Application-wide settings
winston.level = process.env.WINSTON_LEVEL || 'debug';
if (process.env.NODE_ENV !== 'production') {
  require('babel-register');
}

// Scaffolders below
scaffoldExpress();
scaffoldWebSockets();
