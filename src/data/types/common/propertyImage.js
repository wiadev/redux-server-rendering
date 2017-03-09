/**
 * Created by IT on 30.11.2016.
 */
import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as ListType,
} from 'graphql';

export const propertyImage = new ObjectType({
  name: 'propertyImage',
  fields: {
    id: { type: StringType },
    name: { type: StringType, resolve: res => res.attributes.name },
    description: { type: StringType, resolve: res => res.attributes.description },
    type: { type: StringType, resolve: res => res.attributes.type },
    image_url: { type: StringType, resolve: res => res.attributes.image_url },
    center_x: { type: IntType, resolve: res => res.attributes.center_x },
    center_y: { type: IntType, resolve: res => res.attributes.center_y },
    status: { type: IntType, resolve: res => res.attributes.status },
    object_type: { type: StringType, resolve: res => res.attributes.object_type },
    object_id: { type: IntType, resolve: res => res.attributes.object_id },
  },
});
