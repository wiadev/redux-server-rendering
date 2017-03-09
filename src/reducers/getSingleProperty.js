import * as actions from '../actions/properties/getSingleProperty';
import UPDATE_SINGLE_PROPERTY_SUCCESS from '../actions/properties/updateSingleProperty';

const propertyInitState = {
  selectedDay:new Date(),
};

export default function user(state = propertyInitState, action) {
  switch (action.type) {
    case actions.GET_SINGLE_PROPERTY_SUCCESS:
      return {
        ...state,
        ...action.data.getSingleProperty,
      };
      break;
    case actions.GET_SINGLE_PROPERTY_FAIL:
      return {
        ...state,
        ...action.errors,
      };
      break;
    case actions.SET_SELECTED_DAY:
      return {
        ...state,
        selectedDay:action.selectedDay,
      };
      break;
    case "UPDATE_SINGLE_PROPERTY_SUCCESS":
      return {
        ...state,
        data: action.data.updateSingleProperty.data,
      }
    default:
      return state;
  }
}
