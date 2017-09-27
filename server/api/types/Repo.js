import { GraphQLObjectType, GraphQLString } from 'graphql/type';

let Repo = new GraphQLObjectType({
  name: 'Repo',
  description: 'Repos',
  fields: () => ({
    name: {
      type: GraphQLString,
      description: 'The name of the Git repo'
    }
  })
});

export default Repo;
