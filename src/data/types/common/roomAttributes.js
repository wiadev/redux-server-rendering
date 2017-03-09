import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as ListType,
} from 'graphql';

import createAt from './createAt';

export const roomHoursType = new ObjectType({
  name: 'roomHoursType',
  fields: {
    day: { type: StringType },
    open_time: { type: StringType },
    close_time: { type: StringType },
  },
});

export const roomLinks = new ObjectType({
  name: 'roomLinks',
  fields: {
    rel: { type: StringType },
    uri: { type: StringType },
  },
});

export const RoomAttributes = new ObjectType({
  name: 'roomAttributes',
  fields: {
    name: { type: StringType },
    slug: { type: StringType },
    description: { type: StringType },
    property_id: { type: IntType },
    room_type_id: { type: IntType },
    status: { type: IntType },
    created_at: { type: createAt },
    operation_times: { type: new ListType(roomHoursType) },
    starting_at: { type: IntType },
    max_capacity: { type: IntType },
    min_duration: { type: IntType },
    max_duration: { type: IntType },
    min_capacity: { type: IntType },
    min_lead_time: { type: IntType },
    max_lead_time: { type: IntType },
    flip_interval: { type: IntType },
    image_url: { type: StringType },
    links: { type: new ListType(roomLinks) },
  },
});
