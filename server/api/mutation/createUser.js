import { GraphQLObjectType } from 'graphql/type';
import bcrypt from 'bcrypt';
import sequelize from '../../services/sequelize';
import winston from 'winston';
import UserOutputType from '../types/User';
import UserInputType from '../types/UserInput';

export default {
  type: UserOutputType,
  desription: `Creates a new user!!`,
  args: {
    user: {
      type: UserInputType,
      description: `A valid user object`
    }
  },
  resolve: async (obj, args, context) => {
    let transaction = null;
    try {
      if (!args.user) {
        throw new Error(`Please specify a valid User`);
      } else {
        if (!args.user.password) {
          throw new Error(`Please specify a valid password`);
        }
      }
      args.user.password = bcrypt.hashSync(args.user.password, 5);

      transaction = await sequelize.transaction();
      let user = await context.models.User.create(
        {
          password: args.user.password
        },
        { transaction }
      );
      let userEmail = await context.models.UserEmail.create(
        {
          ...args.user,
          user_id: user.id,
          is_primary: true
        },
        { transaction }
      );
      let userProfile = await context.models.UserProfile.create(
        {
          ...args.user,
          user_id: user.id
        },
        { transaction }
      );
      transaction.commit();
      return {
        ...userEmail.toJSON(),
        ...userProfile.toJSON()
      };
    } catch (ex) {
      transaction.rollback();
      let message = `Error encountered`;
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
