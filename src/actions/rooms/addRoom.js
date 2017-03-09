import axios from 'axios';
import cookie from 'react-cookie';
import { reset } from 'redux-form';

export const ADD_ROOM = 'ADD_ROOM';
export const ADD_ROOM_SUCCESS = 'ADD_ROOM_SUCCESS';
export const ADD_ROOM_FAIL = 'ADD_ROOM_FAIL';

export function addRoomSuccess({ data }) {
  return {
    type: ADD_ROOM_SUCCESS,
    data,
  };
}

export function addRoomFail(error) {
  return {
    type: ADD_ROOM_FAIL,
    error,
  };
}

/**
  * When user first is adding a room, we are creating a placeholder (in memory)
  * object inside redux, that pre-populates some fields on the next page
  * once user fills out all other required fields and submits the form
  * then we are actually calling API to create a room
*/
export function addRoomTemp(roomInfo) {
  return (dispatch) => {
    dispatch(reset('addRoom'));
    dispatch(addRoomSuccess({ data: roomInfo }));
  };
}

/**
  * Calling API to create a room
*/
export function addRoom(formValues, propId) {
  const authToken = cookie.load('auth_token');
  const {
    name,
    slug,
    description,
    wifiDetail,
    roomTypeId,
  } = formValues;

  const room_type_id = 1;

  return (dispatch) => {
    return axios({
      url: '/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `{addRoom(token: "${authToken}", name:"${name}", slug:"${slug}", description: "${description}", wifi_details: "${wifiDetail}", property_id: "${propId}", room_type_id: "${room_type_id}"){
          type,id,attributes{name,slug,description,property_id,room_type_id,status,created_at{date,timezone_type,timezone},operation_times{day,open_time,close_time},starting_at,
                max_capacity,min_duration,max_duration,min_capacity,min_lead_time,max_lead_time,flip_interval,image_url,links{rel,uri}}
        }}`,
      }),
    })
    .then((response) => {
      dispatch(reset('addRoom'));
      dispatch(addRoomSuccess(response.data));
    })
    .catch(error => dispatch(addRoomFail(error)));
  };
}
