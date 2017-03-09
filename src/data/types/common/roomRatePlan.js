import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as ListType,
  GraphQLFloat as FloatType,
} from 'graphql';

import createAt from './createAt';
import { roomLinks } from './roomAttributes';

const rateplanType = new ObjectType({
  name: 'rateplanType',
  fields: {
    id: { type: IntType },
    name: { type: StringType },
    description: { type: StringType },
    priority: { type: IntType },
    created_at: { type: createAt },
    updated_at: { type: createAt },
  },
});

export const roomRatePlan = new ObjectType({
  name: 'roomRatePlan',
  fields: {
    type: { type: StringType },
    id: { type: StringType },
    attributes: {
      type: new ObjectType({
        name: 'roomRatePlanAttributes',
        fields: {
          id: { type: IntType },
          room_id: { type: IntType, resolve: res => res.room_id },
          start: { type: StringType, resolve: res => res.start },
          end: { type: StringType, resolve: res => res.end },
          net_rate: { type: FloatType, resolve: res => res.net_rate },
          published_rate: { type: IntType, resolve: res => res.published_rate },
          cond_operand: { type: IntType, resolve: res => res.cond_operand },
          cond_value: { type: IntType, resolve: res => res.cond_value },
          cond_units: { type: IntType, resolve: res => res.cond_units },
          type: { type: rateplanType, resolve: res => res.type },
          created_at: { type: createAt, resolve: res => res.created_at },
          updated_at: { type: createAt, resolve: res => res.updated_at },
          links: { type: new ListType(roomLinks), resolve: res => res.links },
        },
      }), resolve: res => res.attributes },
  },
});
