import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as ListType,
} from 'graphql';

export const propertyRooms = new ObjectType({
  name: 'propertyRooms',
  fields: {
    type: { type: StringType },
    id: { type: StringType },
    name: { type: StringType, resolve: res => res.attributes.name },
    description: { type: StringType, resolve: res => res.attributes.description },
    slug: { type: StringType, resolve: res => res.attributes.slug },
    property_id: { type: IntType, resolve: res => res.attributes.property_id },
    room_type_id: { type: IntType, resolve: res => res.attributes.room_type_id },
    status: { type: IntType, resolve: res => res.attributes.status },
    created_at: { type: new ObjectType({
      name: 'propertyRoomsCreated',
      fields: {
        date: { type: StringType },
        timezone_type: { type: IntType },
        timezone: { type: StringType },
      }
    }), resolve: res => res.attributes.created_at },
    operation_times: { type: new ListType(new ObjectType({
      name: 'propertyRoomsTimes',
      fields: {
        day: { type: StringType },
        open_time: { type: StringType },
        close_time: { type: StringType },
      } })
    ), resolve: res => res.attributes.operation_times },
    starting_at: { type: IntType, resolve: res => res.attributes.starting_at },
    max_capacity: { type: IntType, resolve: res => res.attributes.max_capacity },
    min_duration: { type: IntType, resolve: res => res.attributes.min_duration },
    max_duration: { type: IntType, resolve: res => res.attributes.max_duration },
    min_capacity: { type: IntType, resolve: res => res.attributes.min_capacity },
    min_lead_time: { type: IntType, resolve: res => res.attributes.min_lead_time },
    max_lead_time: { type: IntType, resolve: res => res.attributes.max_lead_time },
    flip_interval: { type: IntType, resolve: res => res.attributes.flip_interval },
    image_url: { type: StringType, resolve: res => res.attributes.image_url },
    links: { type: new ListType(new ObjectType({
      name: 'propertyRoomsLinks',
      fields: {
        rel: { type: StringType },
        uri: { type: StringType },
      } })
    ), resolve: res => res.attributes.links },
  },
});
