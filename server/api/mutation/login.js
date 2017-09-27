import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql/type';
import bcrypt from 'bcrypt';
import winston from 'winston';
import moment from 'moment';
import jwt from 'jsonwebtoken';
import LoginProfileType from '../types/LoginProfile';
import { userTokens } from '../../services/redis';

export default {
  type: LoginProfileType,
  desription: `Logs a user into the API`,
  args: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: `The user's email address`
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: `The user's password`
    }
  },
  resolve: async (obj, args, context) => {
    try {
      let userEmail = await context.models.UserEmail.findOne({
        where: { email: args.email }
      });
      // TODO: This assumes only one password per user account, and each user account can have multiple emails associated to the same password
      let user = await userEmail.getUser();
      let userProfile = await context.models.UserProfile.findOne({
        where: { id: user.user_profile_id }
      });
      let authenticated = bcrypt.compareSync(args.password, user.password);
      if (!authenticated) {
        throw new Error(`Invalid email or password`);
      }
      let tokenPayload = { email: args.email };
      let token = jwt.sign(tokenPayload, process.env.API_SECRET, {
        expiresIn: `1h`
      });
      let refresh_token = jwt.sign({ refresh: true }, process.env.API_SECRET); // Refresh tokens never expire
      let expires = moment().add(1, 'hour').toISOString();
      let profile = {
        ...userProfile.toJSON(),
        ...userEmail.toJSON()
      };

      return {
        token,
        refresh_token,
        expires,
        profile
      };5
    } catch (ex) {
      let message = `Error encountered` || ex.message;

      // TODO: Create a HoF for processing Sequelize errors below
      if (ex.errors) {
        message = ex.errors
          .map(error => {
            return `${error.message}: ${error.value}.`;
          })
          .reduce((priorMessage, currentMessage) => {
            return priorMessage.concat(`${currentMessage} `);
          }, '')
          .trimRight();
      }
      winston.error(message);
      throw new Error(message);
    }
  }
};
