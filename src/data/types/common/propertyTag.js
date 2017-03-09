import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as ListType,
} from 'graphql';

export const propertyTag = new ObjectType({
  name: 'propertyTag',
  fields: {
    id: { type: StringType },
    name: { type: StringType, resolve: res => res.attributes.name },
    description: { type: StringType, resolve: res => res.attributes.description },
    type: { type: StringType, resolve: res => res.attributes.type },
    mapping_id: { type: IntType, resolve: res => res.attributes.mapping_id },
    priority: { type: IntType, resolve: res => res.attributes.priority },
    attributes: {
      type: new ObjectType({
        name: 'propertyTagAttributes',
        fields: {
          name: { type: StringType },
          description: { type: StringType },
          type: { type: StringType },
          tag_type: {
            type: new ObjectType({
              name: 'propertyTagTagType',
              fields: {
                id: { type: IntType },
                name: { type: StringType },
                description: { type: StringType },
                created_at: { type: StringType },
                updated_at: { type: StringType },
                deleted_at: { type: StringType },
              },
            }),
          },
          created_at: {
            type: new ObjectType({
              name: 'propertyTagCreatedAt',
              fields: {
                date: { type: StringType },
                timezone_type: { type: IntType },
                timezone: { type: StringType },
              },
            }),
          },
          updated_at: {
            type: new ObjectType({
              name: 'propertyTagUpdatedAt',
              fields: {
                date: { type: StringType },
                timezone_type: { type: IntType },
                timezone: { type: StringType },
              },
            }),
          },
          links: {
            type: new ListType(new ObjectType({
                name: 'propertyTagLinks',
                fields: {
                  rel: { type: StringType },
                  uri: { type: StringType },
                },
              })
            ),
          },
          priority: { type: IntType },
          mapping_id: { type: IntType },
        },
      }),
    },
  },
});
