import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

export const AddRoomAttributes = new ObjectType({
  name: 'AddRoomAttributes',
  fields: {
    name: { type: StringType },
    slug: { type: StringType },
    description: { type: StringType },
    wifi_details: { type: StringType },
    property_id: { type: StringType },
    room_type_id: { type: StringType },
  },
});
