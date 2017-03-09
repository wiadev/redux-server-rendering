import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLList as ListType,
} from 'graphql';

const propertyAddressesAddresses = new ListType(new ObjectType({
  name: 'propertyAddressesAddresses',
  fields: {
    address: { type: StringType },
    google_place_id: { type: StringType },
  },
}));

const propertyAddressesData = new ObjectType({
  name: 'propertyAddressesData',
  fields: {
    addresses: {
      type: propertyAddressesAddresses, resolve: res => res.addresses,
    },
  },
});

export const propertyAddresses = new ObjectType({
  name: 'propertyAddresses',
  fields: {
    data: {
      type: propertyAddressesData, resolve: res => res.data,
    },
  },
});
