import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

import createAt from './createAt';
import { roomLinks } from './roomAttributes';

export const roomPolicy = new ObjectType({
  name: 'roomPolicy',
  fields: {
    type: { type: StringType },
    id: { type: StringType },
    policy_type_id: { type: IntType, resolve: res => res.attributes.policy_type_id },
    name: { type: StringType, resolve: res => res.attributes.name },
    copy: { type: StringType, resolve: res => res.attributes.copy },
    description: { type: StringType, resolve: res => res.attributes.copy },
    created_at: { type: createAt, resolve: res => res.attributes.created_at },
    updated_at: { type: createAt, resolve: res => res.attributes.updated_at },
    links: { type: roomLinks, resolve: res => res.attributes.links },
    value: { type: StringType, resolve: res => res.attributes.value },
    units: { type: StringType, resolve: res => res.attributes.units },
    mapping_id: { type: IntType, resolve: res => res.attributes.mapping_id },
  },
});
