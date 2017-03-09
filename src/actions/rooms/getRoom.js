import axios from 'axios';
import cookie from 'react-cookie';

export const GET_ROOM_SUCCESS = 'GET_ROOM_SUCCESS';
export const GET_ROOM_FAIL = 'GET_ROOM_FAIL';

export function getRoomSuccess({ data }) {
  return {
    type: GET_ROOM_SUCCESS,
    data,
  };
}

export function getRoomFail(error) {
  return {
    type: GET_ROOM_FAIL,
    error,
  };
}

export function getRoom(roomId) {
  const authToken = cookie.load('auth_token');
  return (dispatch) => {
    return axios({
      url: '/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `{getRoom(token:"${authToken}", roomId:"${roomId}"){
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
          policy{type,id,policy_type_id,name,description,copy,value,units,mapping_id}
          rateplan{type,id,attributes{
            start,end,net_rate,published_rate,cond_operand,cond_value,cond_units,type{name,description,priority}
          }}
          tax{type,id}
          relationships{ratePlans{data{type,id}}}
        }}`,
      }),
    })
    .then(response => dispatch(getRoomSuccess(response.data)))
    .catch(error => dispatch(getRoomFail(error)));
  };
}
