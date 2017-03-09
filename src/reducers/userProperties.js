import * as actions from '../actions/user/properties';

const userPropertiesInitState = {
  properties: [],
  rooms: [],
};

export default function user(state = userPropertiesInitState, action) {
  switch (action.type) {
    case actions.GET_USER_PROPERTIES:
      return {
        ...state,
        properties: action.data,
      };
      break;
    case actions.GET_PROPERTIES_ROOMS:
      return {
        ...state,
        rooms: action.data
      }
    break;
    case actions.GET_USER_PROPERTIES_FAIL:
      return {
        ...state,
        properties: action.errors,
      };
      break;
    default:
      return state;
  }
}
