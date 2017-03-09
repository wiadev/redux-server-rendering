/**
 * Created by IT on 30.11.2016.
 */
import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as ListType,
} from 'graphql';

export const propertyRelationships = new ObjectType({
  name: 'propertyRelationships',
  fields: {
    id: { type: StringType },
    details: {
      type: new ObjectType({
        name: 'propertyRelationshipsDetails',
        fields: {
          data: {
            type: new ObjectType({
              name: 'propertyRelationshipsData',
              fields: {
                type: { type: StringType },
                id: { type: StringType },
              },
            }), resolve: res => res.attributes.details.data,
          },
        },
      }), resolve: res => res.attributes.details,
    },
    tags: {
      type: new ObjectType({
        name: 'propertyRelationshipsTags',
        fields: {
          data: { type: new ListType(new ObjectType({
              name: 'propertyRelationshipsTagsData',
              fields: {
                type: { type: StringType },
                id: { type: StringType },
              },
            })
          ), resolve: res => res.attributes.tags.data,
          },
        },
      }), resolve: res => res.attributes.tags,
    },
    images: {
      type: new ObjectType({
        name: 'propertyRelationshipsImages',
        fields: {
          data: { type: new ListType(new ObjectType({
              name: 'propertyRelationshipsImagesData',
              fields: {
                type: { type: StringType },
                id: { type: StringType },
              },
            })
          ), resolve: res => res.attributes.tags.data,
          },
        },
      }), resolve: res => res.attributes.images,
    },
    rooms: {
      type: new ObjectType({
        name: 'propertyRelationshipsRooms',
        fields: {
          data: { type: new ListType(new ObjectType({
              name: 'propertyRelationshipsRoomsData',
              fields: {
                type: { type: StringType },
                id: { type: StringType },
              },
            })
          ), resolve: res => res.attributes.tags.data,
          },
        },
      }), resolve: res => res.attributes.rooms,
    },
    amenities: {
      type: new ObjectType({
        name: 'propertyRelationshipsAmenities',
        fields: {
          data: { type: new ListType(new ObjectType({
              name: 'propertyRelationshipsAmenitiesData',
              fields: {
                type: { type: StringType },
                id: { type: StringType },
              },
            })
          ), resolve: res => res.attributes.tags.data,
          },
        },
      }), resolve: res => res.attributes.amenities,
    },
    policies: {
      type: new ObjectType({
        name: 'propertyRelationshipsPolicies',
        fields: {
          data: { type: new ListType(new ObjectType({
              name: 'propertyRelationshipPoliciesData',
              fields: {
                type: { type: StringType },
                id: { type: StringType },
              },
            })
          ), resolve: res => res.attributes.tags.data,
          },
        },
      }), resolve: res => res.attributes.policies,
    },
  },
});
