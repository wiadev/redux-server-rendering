import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
} from 'graphql';

import propertyDetails from './propertyDetails';

export const PropertyAttributes = new ObjectType({
  name: 'propertyAttributes',
  fields: {
    name: { type: StringType },
    display_name: { type: StringType },
    slug: { type: StringType },
    property_type_id: { type: IntType },
    display_address: { type: StringType },
    full_address: { type: StringType },
    city: { type: StringType },
    state: { type: StringType },
    country: { type: StringType },
    time_zone: { type: StringType },
    contact_name: { type: StringType },
    email: { type: StringType },
    phone: { type: StringType },
    lng: { type: FloatType },
    lat: { type: FloatType },
    status: { type: IntType },
    featured: { type: IntType },
    starting_at: { type: IntType },
    min_duration: { type: IntType },
    cancellation_policy: { type: IntType },
    max_capacity: { type: IntType },
    image_url: { type: StringType },
    details: { type: propertyDetails },
    city_id: { type: StringType },
  },
});
