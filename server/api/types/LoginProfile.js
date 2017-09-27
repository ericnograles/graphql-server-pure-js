import { GraphQLObjectType, GraphQLString } from 'graphql/type';
import User from './User';

let Login = new GraphQLObjectType({
  name: 'LoginProfile',
  description:
    'Tokens and associated user profile for a user logging into the API',
  fields: () => ({
    token: {
      type: GraphQLString,
      description: `The JWT to pass to authorized edges`
    },
    expires: {
      type: GraphQLString,
      description: `The ISO date of expiration of the token`
    },
    refresh_token: {
      type: GraphQLString,
      description: `The refresh token to use to obtain another JWT`
    },
    profile: {
      type: User,
      description: `Profile information associated with this token`
    }
  })
});

export default Login;
