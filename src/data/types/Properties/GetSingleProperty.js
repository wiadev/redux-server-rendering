import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as ListType,
} from 'graphql';

import { PropertyAttributes } from '../common/propertyAttributes';
import { propertyPolicies } from '../common/propertyPolicies';
import { propertyRooms } from '../common/propertyRooms';
import { propertyAmenity } from '../common/propertyAmenity';
import { propertyImage } from '../common/propertyImage';
import { propertyTag } from '../common/propertyTag';
import propertyDetails from '../common/propertyDetails';
import { propertyRelationships } from '../common/propertyRelationships';

const singlePropertyObj = new ObjectType({
  name: 'singlePropertyObj',
  fields: {
    type: { type: StringType },
    id: { type: new NonNull(StringType) },
    attributes: { type: PropertyAttributes },
  },
});

const SinglePropertyType = new ObjectType({
  name: 'SinglePropertyType',
  fields: {
    data: { type: singlePropertyObj },
    policy: { type: new ListType(propertyPolicies), resolve: res => res.included.filter(item => item.type === 'policy') },
    rooms: { type: new ListType(propertyRooms), resolve: res => res.included.filter(item => item.type === 'room') },
    allAmenities: { type: new ListType(propertyAmenity), resolve: res => res.included.filter(item => item.type === 'amenity') },
    foodAmenities: { type: new ListType(propertyAmenity), resolve: res => res.included.filter(item => (item.type === 'amenity' && item.attributes.parent_amenity_id == 9000)) },
    avAmenities: { type: new ListType(propertyAmenity), resolve: res => res.included.filter(item => (item.type === 'amenity' && item.attributes.parent_amenity_id == 9001)) },
    image: { type: new ListType(propertyImage), resolve: res => res.included.filter(item => item.type === 'image') },
    tag: { type: new ListType(propertyTag), resolve: res => res.included.filter(item => item.type === 'tag') },
    propertyDetails: { type: new ListType(propertyDetails), resolve: res => res.included.filter(item => item.type === 'propertyDetails') },
    relationships: { type: new ListType(propertyRelationships), resolve: res => res.data.filter(item => item.type === 'relationships') },
  },
});

export default SinglePropertyType;
