import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLNonNull as NonNull,
  GraphQLList as ListType,
} from 'graphql';

import { PropertyAttributes } from '../common/propertyAttributes';
import { propertyRooms } from '../common/propertyRooms';

const propertyObj = new ObjectType({
  name: 'propertyObj',
  fields: {
    type: { type: StringType },
    id: { type: new NonNull(StringType) },
    attributes: { type: PropertyAttributes },
    rooms: { type: new ListType(new ObjectType({
      name: 'allPropsRoomsRelationships',
      fields: {
        id: { type: StringType },
        type: { type: StringType },
      },
    })), resolve: res => res.relationships.rooms.data },
  },
});


const UserPropertiesType = new ObjectType({
  name: 'UserPropertiesType',
  fields: {
    data: { type: new ListType(propertyObj) },
    rooms: { type: new ListType(propertyRooms), resolve: res => res.included.filter(item => item.type === 'room') },
  },
});


export default UserPropertiesType;
