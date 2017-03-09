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

const roomIcon = new ObjectType({
  name: 'roomIcon',
  fields: {
    id: { type: IntType },
    name: { type: StringType },
    description: { type: StringType },
    src_url: { type: StringType },
    created_at: { type: createAt },
    updated_at: { type: createAt },
    deleted_at: { type: createAt },
  },
});

const roomFeeAndTaxes = new ObjectType({
  name: 'roomFeeAndTaxes',
  fields: {
    id: { type: IntType },
    name: { type: StringType },
    description: { type: StringType },
    taxable: { type: IntType },
    created_at: { type: createAt },
    updated_at: { type: createAt },
    pivot: { type: new ObjectType({
      name: 'feePivot',
      fields: {
        object_id: { type: IntType },
        fee_definition_id: { type: IntType },
        id: { type: IntType },
        type: { type: StringType },
        rate: { type: FloatType },
      },
    }) },
  },
});

export const roomAmenity = new ObjectType({
  name: 'roomAmenity',
  fields: {
    type: { type: StringType },
    id: { type: StringType },
    attributes: {
      type: new ObjectType({
        name: 'roomAmenityAttributes',
        fields: {
          property_amenity_id: { type: IntType },
          name: { type: StringType },
          description: { type: StringType },
          property_id: { type: IntType },
          amenity_id: { type: IntType },
          parent_amenity_id: { type: IntType },
          net_rate: { type: FloatType },
          published_rate: { type: IntType },
          units: { type: StringType },
          flat_rate: { type: BooleanType },
          included: { type: BooleanType },
          notice_required: { type: BooleanType },
          disclaimer: { type: StringType },
          created_at: { type: createAt },
          updated_at: { type: createAt },
          icon: { type: roomIcon, resolve: res => res.attributes.icon },
          fees: { type: roomFeeAndTaxes },
          taxes: { type: roomFeeAndTaxes },
          min_amenity_lead_time: { type: IntType },
          min_amenity_order_quantity: { type: IntType },
          links: { type: roomLinks, resolve: res => res.attributes.links },
        },
    }), resolve: res => res.attributes },
  },
});
