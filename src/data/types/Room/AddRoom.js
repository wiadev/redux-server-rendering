import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLNonNull as NonNull,
} from 'graphql';

import { RoomAttributes } from '../common/roomAttributes';

const NewRoomType = new ObjectType({
  name: 'NewRoomType',
  fields: {
    type: { type: StringType },
    id: { type: new NonNull(StringType) },
    attributes: { type: RoomAttributes },
  },
});

export default NewRoomType;
