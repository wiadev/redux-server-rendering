import * as actions from '../actions/rooms/getRoom';
import { UPDATE_ROOM_SUCCESS, UPDATE_ROOM_FAIL } from '../actions/rooms/updateRoom';
import { RESET_ROOM } from '../actions/rooms/resetRoom';

const roomInitState = {};

export default function user(state = roomInitState, action) {
  switch (action.type) {
    case actions.GET_ROOM_SUCCESS:
      return {
        ...state,
        ...action.data.getRoom,
      };
    case actions.GET_ROOM_FAIL:
      return {
        ...state,
        ...action.errors,
      };
    case UPDATE_ROOM_SUCCESS:
      return {
        ...state,
        ...action.data.updateRoom,
      };
    case UPDATE_ROOM_FAIL:
      return {
        ...state,
        ...action.errors,
      };
    case RESET_ROOM:
      return {};
    default:
      return state;
  }
}
