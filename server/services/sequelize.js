import { DATABASE_URL } from './constants';
import Sequelize from 'sequelize';

export default new Sequelize(DATABASE_URL);
