import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as ListType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BooleanType,
} from 'graphql';

const propertyAmenityFees = new ObjectType({
  name: 'propertyAmenityFees',
  fields: {
    id: { type: IntType },
    name: { type: StringType },
    description: { type: StringType },
    taxable: { type: IntType },
    created_at: { type: StringType },
    updated_at: { type: StringType },
    pivot: { type: new ObjectType({
      name: 'propertyAmenityFeesPivot',
      fields: {
        object_id: { type: IntType },
        fee_definition_id: { type: IntType },
        id: { type: IntType },
        type: { type: StringType },
        rate: { type: FloatType },
      },
    }) },
  }
});


const propertyAmenityTaxes = new ObjectType({
  name: 'propertyAmenityTaxes',
  fields: {
    id: { type: IntType },
    name: { type: StringType },
    description: { type: StringType },
    created_at: { type: StringType },
    updated_at: { type: StringType },
    pivot: { type: new ObjectType({
      name: 'propertyAmenityTaxesPivot',
      fields: {
        object_id: { type: IntType },
        tax_definition_id: { type: IntType },
        id: { type: IntType },
        type: { type: StringType },
        rate: { type: FloatType },
      },
    }) },
  }
});

export const propertyAmenity = new ObjectType({
  name: 'propertyAmenity',
  fields: {
    type: { type: StringType },
    id: { type: StringType },
    attributes: { type: new ObjectType({
      name: 'propertyAmenitysAttributes',
      fields: {
        name: { type: StringType },
        description: { type: StringType },
        property_id: { type: IntType },
        amenity_id: { type: IntType },
        parent_amenity_id: { type: IntType },
        net_rate: { type: FloatType },
        published_rate: { type: StringType },
        units: { type: StringType },
        flat_rate: { type: BooleanType },
        included: { type: BooleanType },
        notice_required: { type: BooleanType },
        disclaimer: { type: StringType },
        created_at: { type: StringType },
        updated_at: { type: StringType },
        iconUrl: { type: StringType, resolve: res => res.icon.src_url },
        icon: { type: new ObjectType({
          name: 'propertyAmenityIcon',
          fields: {
            id: { type: IntType },
            name: { type: StringType },
            description: { type: StringType },
            src_url: { type: StringType },
            created_at: { type: StringType },
            updated_at: { type: StringType },
            deleted_at: { type: StringType },
          },
        }), resolve: res => res.attributes.icon },
        fees: { type: new ListType(propertyAmenityFees), resolve: res => res.attributes.fees },
        taxes: { type: new ListType(propertyAmenityTaxes), resolve: res => res.attributes.taxes },
        min_amenity_lead_time: { type: IntType },
        min_amenity_order_quantity: { type: IntType },
        links: { type: new ListType(new ObjectType({
          name: 'propertyAmenityAttributesLinks',
          fields: {
            rel: { type: StringType },
            uri: { type: StringType },
          } })
        ), resolve: res => res.attributes.links },
      },
    }), resolve: res => res.attributes },
  },
});
