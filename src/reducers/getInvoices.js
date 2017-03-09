import * as actions from '../actions/properties/getInvoices';

const invoicesInitState = [];

export default function user(state = invoicesInitState, action) {
  switch (action.type) {
    case actions.GET_INVOICES_SUCCESS:
      return {
        ...state,
        ...action.payload.getInvoices,
      };
      break;
    case actions.GET_INVOICES_FAIL:
      return {
        ...state,
        ...action.payload,
      };
      break;
    default:
      return state;
  }
}
