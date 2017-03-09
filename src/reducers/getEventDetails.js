import * as actions from '../actions/events/getEventDetails';

const eventsInitState = [];

export default function user(state = eventsInitState, action) {
  switch (action.type) {
    case actions.GET_EVENT_DETAILS_SUCCESS:
      return {
        ...state,
        eventDetails: action.data.getEventDetails.data,
      };
      break;
    case actions.GET_EVENT_DETAILS_FAIL:
      return {
        ...state,
        ...action.errors,
      };
      break;
    default:
      return state;
  }
}
