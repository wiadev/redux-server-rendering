import * as actions from '../actions/properties/getCustomers';

const customersInitState = [];

export default function user(state = customersInitState, action) {
  switch (action.type) {
    case actions.GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        ...action.payload.getCustomers,
      };
      break;
    case actions.GET_CUSTOMERS_FAIL:
      return {
        ...state,
        ...action.payload,
      };
      break;
    default:
      return state;
  }
}
