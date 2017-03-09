import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
} from 'graphql';

const details = new ObjectType({
  name: 'details',
  fields: {
    id: { type: IntType },
    property_id: { type: IntType },
    deckline: { type: StringType },
    description: { type: StringType },
    executive_summary: { type: StringType },
    logo_url: { type: StringType },
    privacy_url: { type: StringType },
    terms_url: { type: StringType },
    status: { type: IntType },
    created_at: { type: StringType },
    updated_at: { type: StringType },
/*
* Changing structure according to json going to query error

 created_at: {
 type: new ObjectType({
 name: 'propertyTagCreatedAt',
 fields: {
 date: { type: StringType },
 timezone_type: { type: IntType },
 timezone: { type: StringType },
 },
 }), resolve: res => res.attributes.created_at,
 },
 updated_at: {
 type: new ObjectType({
 name: 'propertyTagUpdatedAt',
 fields: {
 date: { type: StringType },
 timezone_type: { type: IntType },
 timezone: { type: StringType },
 },
 }), resolve: res => res.attributes.updated_at,
 },
 */

    moderated_at: { type: StringType },
    moderated_by: { type: StringType },
    deleted_at: { type: StringType },
    room_commission_rate: { type: FloatType },
    amenity_commission_rate: { type: FloatType },
  },
});

export default details;
