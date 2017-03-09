import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

import propertyIncludesAttributes from './propertyIncludesAttributes';

const propertyIncludes = new ObjectType({
  name: 'propertyIncludes',
  fields: {
    type: { type: StringType },
    id: { type: IntType },
    attributes: { type: propertyIncludesAttributes },
  },
});

export default propertyIncludes;
