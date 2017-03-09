import * as actions from '../actions/properties/getAddresses';

const addressesInitState = {
  addresses: [],
};

export default function user(state = addressesInitState, action) {
  switch (action.type) {
    case actions.GET_ADDRESSES_SUCCESS:
      return {
        ...state,
        addresses: action.data.getAddresses.data.addresses,
      };
    case actions.GET_ADDRESSES_FAIL:
      return {
        ...state,
        ...action.errors,
        addresses: [],
      };
    default:
      return state;
  }
}
