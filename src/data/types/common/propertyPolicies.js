import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as ListType,
} from 'graphql';

export const propertyPolicies = new ObjectType({
  name: 'propertyPolicies',
  fields: {
    type: { type: StringType },
    id: { type: StringType },
    name: { type: StringType, resolve: res => res.attributes.name },
    description: { type: StringType, resolve: res => res.attributes.description },
    policy_type_id: { type: IntType, resolve: res => res.attributes.policy_type_id },
    copy: { type: StringType, resolve: res => res.attributes.description },
    created_at: { type: StringType, resolve: res => res.attributes.created_at },
    updated_at: { type: StringType, resolve: res => res.attributes.updated_at },
    value: { type: StringType, resolve: res => res.attributes.value },
    mapping_id: { type: IntType, resolve: res => res.attributes.mapping_id },
    links: { type: new ListType(new ObjectType({
      name: 'propertyPoliciesAttributesLinks',
      fields: {
        rel: { type: StringType },
        uri: { type: StringType },
      } })
    ), resolve: res => res.attributes.links },
  },
});
