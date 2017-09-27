import knex from 'knex';
import pg from 'pg';
import { DATABASE_URL } from './constants';

pg.defaults.ssl = DATABASE_URL.indexOf('127.0.0.1') < 0;

export default knex({
  client: 'pg',
  connection: DATABASE_URL,
  searchPath: process.env.POSTGRES_SCHEMA || 'public'
});
