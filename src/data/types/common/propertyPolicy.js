import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
} from 'graphql';

export const propertyPolicy = new ObjectType({
  name: 'propertyPolicy',
  fields: {
    type: { type: StringType },
    id: { type: StringType },
    attributes: {
      type: new ObjectType({
        name: 'propertyPolicyAttributes',
        fields: {
          object_type: { type: StringType },
          object_id: { type: IntType },
          policy: {
            type: new ObjectType({
              name: 'propertyPolicyPolicy',
              fields: {
                id: { type: IntType },
                name: { type: StringType },
                description: { type: StringType },
                copy: { type: StringType },
                type: {
                  type: new ObjectType({
                    name: 'propertyPolicyPolicyType',
                    fields: {
                      id: { type: IntType },
                      name: { type: StringType },
                      description: { type: StringType },
                    },
                  }), resolve: res => res.attributes.attributes.policy.type,
                },
              },
            }), resolve: res => res.attributes.attributes.policy,

          },
        },
      }), resolve: res => res.attributes.attributes,
    },
    value: { type: StringType },
    units: { type: StringType },
    created_at: {
      type: new ObjectType({
        name: 'propertyPolicyCreatedAt',
        fields: {
          date: { type: StringType },
          timezone_type: { type: IntType },
          timezone: { type: StringType },
        },
      }), resolve: res => res.attributes.created_at,
    },
    updated_at: {
      type: new ObjectType({
        name: 'propertyPolicyUpdatedAt',
        fields: {
          date: { type: StringType },
          timezone_type: { type: IntType },
          timezone: { type: StringType },
        },
      }), resolve: res => res.attributes.updated_at,
    },
  },
});
