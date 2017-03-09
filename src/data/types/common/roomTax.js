import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
} from 'graphql';

import createAt from './createAt';

export const roomTax = new ObjectType({
  name: 'roomTax',
  fields: {
    type: { type: StringType },
    id: { type: StringType },
    attributes: {
      type: new ObjectType({
        name: 'roomTaxAttributes',
        fields: {
          name: { type: StringType },
          description: { type: StringType },
          created_at: { type: createAt, resolve: res => res.attributes.created_at },
          updated_at: { type: createAt, resolve: res => res.attributes.updated_at },
          type: { type: StringType },
          rate: { type: FloatType },
          mapping_id: { type: IntType },
        },
      }), resolve: res => res.attributes }
  },
});
