import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLInputObjectType as InputObjectType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

import createAt from './createAt';
import { roomLinks } from './roomAttributes';

export const roomBlockedTime = new ObjectType({
  name: 'roomBlockedTime',
  fields: {
    type: { type: StringType },
    id: { type: StringType },
    attributes: {
      type: new ObjectType({
        name: 'roomBlockedTimeAttributes',
        fields: {
          room_id: { type: StringType },
          state: { type: StringType },
          start: { type: createAt },
          end: { type: createAt },
          links: { type: roomLinks, resolve: res => res.attributes.links },
        },
      }),
      resolve: res => res.attributes },
  },
});
