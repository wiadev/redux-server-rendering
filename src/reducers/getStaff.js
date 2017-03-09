import * as actions from '../actions/properties/getStaff';

const staffInitState = {};

export default function user(state = staffInitState, action) {
  switch (action.type) {
    case actions.GET_STAFF_SUCCESS:
      return {
        ...state,
        ...action.payload.getStaff.data,
      };
      break;
    case actions.GET_STAFF_FAIL:
      return {
        ...state,
        ...action.payload,
      };
      break;
    default:
      return state;
  }
}
