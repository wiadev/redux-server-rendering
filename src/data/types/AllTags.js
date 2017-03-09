import {
  GraphQLObjectType as ObjectType,
  GraphQLList as ListType,
} from 'graphql';

import { propertyTag } from './common/propertyTag';

const AllTags = new ObjectType({
  name: 'AllTags',
  fields: {
    data: { type: new ListType(propertyTag) },
  },
});

export default AllTags;
