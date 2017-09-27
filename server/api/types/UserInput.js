import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql/type';

let UserInput = new GraphQLInputObjectType({
  name: 'UserInputInput',
  fields: () => ({
    first_name: {
      type: new GraphQLNonNull(GraphQLString),
      description: `First name`
    },
    last_name: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Last name`
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Email`
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
      description: `Password`
    },
    city: {
      type: GraphQLString
    },
    state: {
      type: GraphQLString
    }
  })
});

export default UserInput;
