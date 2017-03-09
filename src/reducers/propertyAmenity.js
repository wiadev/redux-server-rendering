import * as actions from '../actions/properties/propertyAmenity';

const propertyAmenityState = {};

export default function user(state = propertyAmenityState, action) {
  switch (action.type) {
    case actions.UPDATE_AMENITY_SUCCESS:
      console.log(action);
      return {
        ...state,
        ...action.payload,
      };
      break;
    case actions.UPDATE_AMENITY_FAIL:
      return {
        ...state,
        ...action.errors,
      };
      break;
    case actions.CREATE_AMENITY_SUCCESS:
      return {
        ...state,
        ...action.payload.createAmenity,
      };
      break;
    case actions.CREATE_AMENITY_FAIL:
      return {
        ...state,
        ...action.errors,
      };
      break;
    default:
      return state;
  }
}
