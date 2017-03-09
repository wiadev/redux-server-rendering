export const RESET_ROOM = 'RESET_ROOM';

export function resetRoomSuccess() {
  return {
    type: RESET_ROOM,
  };
}

export function resetRoom() {
  return (dispatch) => {
    dispatch(resetRoomSuccess());
  }
}
