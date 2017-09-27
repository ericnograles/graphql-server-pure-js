import { GraphQLObjectType, GraphQLString } from 'graphql/type';

let User = new GraphQLObjectType({
  name: 'User',
  description: 'Users',
  fields: () => ({
    first_name: {
      type: GraphQLString,
      description: `User's first name`
    },
    last_name: {
      type: GraphQLString,
      description: `User's last name`
    },
    email: {
      type: GraphQLString,
      description: `User's email`
    }
  })
});

export default User;
