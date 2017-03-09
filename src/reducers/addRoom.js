import * as actions from '../actions/rooms/addRoom';

const addRoomInitState = {};

export default function user(state = addRoomInitState, action) {
  switch (action.type) {
    case actions.ADD_ROOM_SUCCESS:
      return {
        ...state,
        ...action.data,
      };
    case actions.ADD_ROOM_FAIL:
      return {
        ...state,
        ...action.errors,
      };
    default:
      return state;
  }
}
