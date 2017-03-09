import {
  GraphQLObjectType as ObjectType,
  GraphQLList as ListType,
} from 'graphql';

import calendarItem from './CalendarItem';

const GetPropertyEvents = new ObjectType({
  name: 'GetPropertyEvents',
  fields: {
    data: {
      type: new ObjectType({
        name: 'GetPropertyEventsData',
        fields: {
          calendar: {
            type: new ObjectType({
              name: 'GetPropertyEventsDataCalendar',
              fields: {
                data: { type: new ListType(calendarItem), resolve: res => res.data },
              },
            }), resolve: res => res.calendar,
          },
        },
      }), resolve: res => res.data,
    },

  },
});

export default GetPropertyEvents;
