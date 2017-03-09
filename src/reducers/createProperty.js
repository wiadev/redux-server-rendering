import * as actions from '../actions/properties/createProperty';

const createPropertyInitState = {};

export default function user(state = createPropertyInitState, action) {
  switch (action.type) {
    case actions.CREATE_PROPERTY_SUCCESS:
      return {
        ...state,
        ...action.data.createProperty,
      };
      break;
    case actions.CREATE_PROPERTY_FAIL:
      return {
        ...state,
        ...action.errors,
      };
      break;
    default:
      return state;
  }
}
