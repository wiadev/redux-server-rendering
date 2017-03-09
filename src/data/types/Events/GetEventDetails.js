import {
  GraphQLObjectType as ObjectType,
  } from 'graphql';

import Event from './Event';

const GetEventDetails = new ObjectType({
  name: 'GetEventDetails',
  fields: {
    data: { type: Event, resolve: res => res.data },
  },
});

export default GetEventDetails;
