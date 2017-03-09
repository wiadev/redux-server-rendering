import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLList as ListType,
  GraphQLInt as IntType,
  GraphQLUnionType as UnionType,
} from 'graphql';

import { RoomAttributes } from '../common/roomAttributes';
import { RoomRelationships } from '../common/roomRelationships';
import { roomAmenity } from '../common/roomAmenity';
import { roomBlockedTime } from '../common/roomBlockedTime';
import { roomPolicy } from '../common/roomPolicy';
import { roomRatePlan } from '../common/roomRatePlan';
import { roomTax } from '../common/roomTax';

const roomObj = new ObjectType({
  name: 'roomObj',
  fields: {
    type: { type: StringType },
    id: { type: new NonNull(StringType) },
    attributes: { type: RoomAttributes },
  },
});

const RoomType = new ObjectType({
  name: 'RoomType',
  fields: {
    data: { type: roomObj },
    amenity: { type: new ListType(roomAmenity), resolve: res => res.included.filter(item => item.type === 'amenity') },
    blockedtime: { type: new ListType(roomBlockedTime), resolve: res => res.included.filter(item => item.type === 'blockedtime') },
    policy: { type: new ListType(roomPolicy), resolve: res => res.included.filter(item => item.type === 'policy') },
    rateplan: { type: new ListType(roomRatePlan), resolve: res => res.included.filter(item => item.type === 'rateplan') },
    tax: { type: new ListType(roomTax), resolve: res => res.included.filter(item => item.type === 'tax') },
    relationships: { type: RoomRelationships, resolve: res => res.included.filter(item => item.type === 'relationships') },
  },
});

export default RoomType;
