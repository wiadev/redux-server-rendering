import * as actions from '../actions/tags/getTags';

const tagsInitState = [];

export default function getTags(state = tagsInitState, action) {
  switch (action.type) {
    case actions.GET_ALL_TAGS:
      return {
        ...state,
        ...action.payload.getAllTags.data,
      };
    case actions.GET_ALL_TAGS_FAIL:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}
