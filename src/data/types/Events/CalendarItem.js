import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLInt as IntType,
  GraphQLList as ListType,
  GraphQLBoolean as BooleanType
} from 'graphql';
import moment from 'moment';
import createAt from '../common/createAt';


const linksType = new ListType(new ObjectType({
  name: 'linksType',
  fields: {
    rel: { type: StringType },
    uri: { type: StringType },
  },
}));

const createdBy = new ObjectType({
  name: 'createdBy',
  fields: {
    id: { type: IntType },
    name: { type: StringType },
    email: { type: StringType },
  },
});


const blockedTime = new ObjectType({
  name: 'calendarItemAttributesEventBlockedTime',
  fields: {
    id: { type: IntType },
    room_id: { type: IntType },
    start: { type: createAt },
    end: { type: createAt },
    user_id: { type: IntType },
  },
});

const calendarItemAttributesEvent = new ObjectType({
  name: 'calendarItemAttributesEvent',
  fields: {
    id: { type: IntType },
    name: { type: StringType },
    description: { type: StringType },
    room_id: { type: IntType },
    blocked_time: { type: blockedTime, resolve: res => res.blocked_time },
    created_by: { type: createdBy, resolve: res => res.created_by },
    updated_by: { type: IntType },
    created_at: { type: createAt, resolve: res => res.created_at },
    updated_at: { type: createAt, resolve: res => res.updated_at },
    links: { type: linksType, resolve: res => res.links },
  },
});

const calendarItemRoom = new ObjectType({
  name: 'calendarItemRoom',
  fields: {
    id: { type: IntType },
    name: { type: StringType },
    slug: { type: StringType },
    description: { type: StringType },
    wifi_details: { type: StringType },
    property_id: { type: IntType },
    room_type_id: { type: IntType },
    status: { type: IntType },
    created_at: { type: StringType },
    updated_at:  { type: StringType },
    moderated_at:  { type: StringType },
    moderated_by: { type: IntType },
  },
});

const calendarItemAttributes = new ObjectType({
  name: 'calendarItemAttributes',
  fields: {
    type: { type: IntType },
    reservation: { type: BooleanType },
    event: { type: calendarItemAttributesEvent, resolve: res => res.event },
    room: { type: calendarItemRoom, resolve: res => res.room },
    state: { type: StringType },
    start: { type: createAt, resolve: res => res.start },
    end: { type: createAt, resolve: res => res.end },
    links: { type: linksType, resolve: res => res.links },
  },
});


const calendarItem = new ObjectType({
  name: 'calendarItem',
  fields: {
    type: { type: StringType },
    id: { type: StringType },
    attributes: { type: calendarItemAttributes, resolve: res => res.attributes },
  },
});

export default calendarItem;
