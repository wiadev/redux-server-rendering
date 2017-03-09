import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as ListType,
} from 'graphql';

export const roomRelationshipDetail = new ObjectType({
  name: 'roomRelationshipDetail',
  fields: {
    type: { type: StringType },
    id: { type: IntType },
  },
});

export const RoomRelationships = new ObjectType({
  name: 'roomRelationships',
  fields: {
    ratePlans: {
      type: new ObjectType({
        name: 'roomRelationshipRatePlans',
        fields: {
          data: {
            type: new ListType(roomRelationshipDetail),
          },
        },
      }),
    },
    // amenities: { type: new ObjectType({
    //   name: 'amenities',
    //   fields: {
    //     data: { type: new ListType(roomRelationshipDetail) },
    //   },
    // }) },
    // blockedTimes: { type: new ObjectType({
    //   name: 'blockedTimes',
    //   fields: {
    //     data: { type: new ListType(roomRelationshipDetail) },
    //   },
    // }) },
    // policies: { type: new ObjectType({
    //   name: 'policies',
    //   fields: {
    //     data: { type: new ListType(roomRelationshipDetail) },
    //   },
    // }) },
    // taxes: { type: new ObjectType({
    //   name: 'taxes',
    //   fields: {
    //     data: { type: new ListType(roomRelationshipDetail) },
    //   },
    // }) },
    // fees: { type: new ObjectType({
    //   name: 'fees',
    //   fields: {
    //     data: { type: new ListType(roomRelationshipDetail) },
    //   },
    // }) },
  },
});
