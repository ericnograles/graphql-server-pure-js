import { GraphQLList, GraphQLNonNull, GraphQLString } from 'graphql/type';
import User from '../types/User';
import winston from 'winston';

let user = {
  type: User,
  args: {
    email: {
      name: 'email',
      type: GraphQLString,
      description: `The email of the User for which to search`
    }
  },
  resolve: async (rootValue, args, context) => {
    let userEmail = await context.models.UserEmail.findOne({
      where: { email: args.email }
    });
    if (!userEmail) {
      throw new Error(`Cannot find profile for ${args.email}`);
    }

    let user = await userEmail.getUser();
    let userProfile = await context.models.UserProfile.findOne({
      where: { id: user.user_profile_id }
    });
    let result = {
      ...userEmail.toJSON(),
      ...user.toJSON(),
      ...userProfile.toJSON()
    };

    delete result.password;
    return result;
  }
};

export default user;
