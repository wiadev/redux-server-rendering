import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as ListType,
} from 'graphql';

const userRole = new ListType(new ObjectType({
  name: 'userRole',
  fields: {
    id: { type: IntType },
    name: { type: StringType },
    slug: { type: StringType },
    description: { type: StringType },
    level: { type: IntType },
  },
}));

export default userRole;
