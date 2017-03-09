import * as actions from '../actions/events/getPropertyEvents';

const eventsInitState = [];

export default function user(state = eventsInitState, action) {
  switch (action.type) {
    case actions.GET_PROPERTY_EVENTS_SUCCESS:
      return {
        ...state,
        events: action.payload.getPropertyEvents.data.calendar.data,
      };
      break;
    case actions.GET_PROPERTY_EVENTS_FAIL:
      return {
        ...state,
        ...action.errors,
      };
      break;
    default:
      return state;
  }
}
