import {
  GraphQLObjectType as ObjectType,
  GraphQLList as ListType,
} from 'graphql';

import Event from './Event';

const CreatePropertyEvent = new ObjectType({
  name: 'CreatePropertyEvent',
  fields: {
    data: { type: Event, resolve: res => res.data },
  },
});

export default CreatePropertyEvent;
