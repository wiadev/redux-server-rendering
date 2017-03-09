import * as actions from '../actions/uploads/getPropertyDocuments';

const documentsInitState = [];

export default function user(state = documentsInitState, action) {
  switch (action.type) {
    case actions.GET_PROPERTY_DOCUMENETS:
      return {
        ...state,
        ...action.payload.getPropertyDocuments.data,
      };
      break;
    case actions.GET_PROPERTY_DOCUMENETS_FAIL:
      return {
        ...state,
        ...action.payload,
      };
      break;
    default:
      return state;
  }
}
