import axios from 'axios';
import cookie from 'react-cookie';

export const UPDATE_ROOM = 'UPDATE_ROOM';
export const UPDATE_ROOM_SUCCESS = 'UPDATE_ROOM_SUCCESS';
export const UPDATE_ROOM_FAIL = 'UPDATE_ROOM_FAIL';

export function updateRoomSuccess({ data }) {
  return {
    type: UPDATE_ROOM_SUCCESS,
    data,
  };
}

export function updateRoomFail(error) {
  return {
    type: UPDATE_ROOM_FAIL,
    error,
  };
}

/**
  * Calling API to update a room
*/
export function updateRoom(formValues, roomId) {
  const authToken = cookie.load('auth_token');
  const {
    name,
    slug,
    description,
    wifiDetail,
    roomTypeId,
    area,
    location
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
        query: `{updateRoom(token: "${authToken}", name:"${name}", slug:"${slug}", description: "${description}", wifi_details: "${wifiDetail}", room_type_id: "${room_type_id}", area: "${area}", location: "${location}", roomId: "${roomId}"){
          data{type,id,
            attributes{name,slug,description,property_id,room_type_id,status,
              created_at{date,timezone_type,timezone},
              operation_times{day,open_time,close_time},
              starting_at,max_capacity,min_duration,max_duration,min_capacity,min_lead_time,
              max_lead_time,flip_interval,image_url,links{rel,uri}}},
          amenity{type,id,attributes{property_id,amenity_id}}
          blockedtime{type,id,attributes{
            room_id,state,start{date,timezone_type,timezone},end{date,timezone_type,timezone}
          }}
          policy{type,id,attributes{policy_type_id}}
          rateplan{type,id,attributes{
            start,end,net_rate,published_rate,cond_operand,cond_value,cond_units,type{name,description,priority}
          }}
          tax{type,id}
          relationships{ratePlans{data{type,id}}}
        }}`,
      }),
    })
    .then((response) => {
      dispatch(updateRoomSuccess(response.data));
    })
    .catch(error => dispatch(updateRoomFail(error)));
  };
}
