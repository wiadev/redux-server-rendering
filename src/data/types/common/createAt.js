import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

const createAt = new ObjectType({
  name: 'createAt',
  fields: {
    date: { type: StringType },
    timezone_type: { type: IntType },
    timezone: { type: StringType },
  },
});

export default createAt;
