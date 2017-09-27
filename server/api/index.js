import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} from 'graphql/type';
import UserQueryType from './query/user';
import createUser from './mutation/createUser';
import login from './mutation/login';

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      user: UserQueryType,
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'MutationType',
    fields: {
      createUser,
      login
    }
  })
});
