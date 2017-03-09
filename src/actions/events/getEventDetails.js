import axios from 'axios';

export const GET_EVENT_DETAILS = 'GET_EVENT_DETAILS';
export const GET_EVENT_DETAILS_SUCCESS = 'GET_EVENT_DETAILS_SUCCESS';
export const GET_EVENT_DETAILS_FAIL = 'GET_EVENT_DETAILS_FAIL';

export function getEventDetailsSuccess({ data }) {
  return {
    type: GET_EVENT_DETAILS_SUCCESS,
    data: data,
  };
}

export function getEventDetailsFail(error) {
  return {
    type: GET_EVENT_DETAILS_FAIL,
    errors: error,
  };
}

export function getEventDetails(eventId, room) {
  /*set data for reservation event popup*/
  if (room != undefined) {
    room.reservation = true;
    return (dispatch) => { dispatch(getEventDetailsSuccess({ data: { getEventDetails: { data: { attributes: room } } } }));};
  }
  /*set empty data on close popup*/
  else if (eventId <= 0)
    return (dispatch) => { dispatch(getEventDetailsSuccess({ data: { getEventDetails: {} } })); };
  else
  return (dispatch) => {
    return axios({
      url: '/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `{getEventDetails(eventId:"${eventId}"){
        data{type,id,attributes{name,description,room_id,
            blocked_time{id,room_id,
              start{date,timezone_type,timezone},
              end{date,timezone_type,timezone},
              user_id
            },
            created_by{id,name,email},
            updated_by,
            created_at{date,timezone_type,timezone},
            updated_at{date,timezone_type,timezone},
            links{rel,uri}
          }
        }
                  
        }}`,
      }),
    })
      .then(response => dispatch(getEventDetailsSuccess(response.data)))
      .catch(error => dispatch(getEventDetailsFail(error)));
  };
}
