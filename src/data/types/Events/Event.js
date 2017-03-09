import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as ListType,
} from 'graphql';
import moment from 'moment';
import createAt from '../common/createAt';

const eventBlockedTime = new ObjectType({
  name: 'eventBlockedTime',
  fields: {
    id: { type: IntType },
    room_id: { type: IntType },
    start: { type: createAt },
    end: { type: createAt },
    user_id: { type: IntType },
  },
});

const linksType = new ListType(new ObjectType({
  name: 'eventLinksType',
  fields: {
    rel: { type: StringType },
    uri: { type: StringType },
  },
}));

const eventCreatedBy = new ObjectType({
  name: 'eventCreatedBy',
  fields: {
    id: { type: IntType },
    name: { type: StringType },
    email: { type: StringType },
  },
});

const eventAttributes = new ObjectType({
  name: 'eventAttributes',
  fields: {
    name: { type: StringType },
    description: { type: StringType },
    room_id: { type: IntType },
    blocked_time: { type: eventBlockedTime, resolve: res => res.blocked_time },
    created_by: { type: eventCreatedBy, resolve: res => res.created_by },
    updated_by: { type: IntType },
    created_at: { type: createAt, resolve: res => res.created_at },
    updated_at: { type: createAt, resolve: res => res.updated_at },
    links: { type: linksType, resolve: res => res.links },
  },
});

const Event = new ObjectType({
  name: 'eventType',
  fields: {
    type: { type: StringType },
    id: { type: StringType },
    attributes: { type: eventAttributes, resolve: res => res.attributes },
  },
});

export default Event;
