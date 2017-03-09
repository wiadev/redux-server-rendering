import axios from 'axios';

export const GET_PROPERTY_EVENTS = 'GET_PROPERTY_EVENTS';
export const GET_PROPERTY_EVENTS_SUCCESS = 'GET_PROPERTY_EVENTS_SUCCESS';
export const GET_PROPERTY_EVENTS_FAIL = 'GET_PROPERTY_EVENTS_FAIL';

export function getEventsSuccess({ data }) {
  return {
    type: GET_PROPERTY_EVENTS_SUCCESS,
    payload: data,
  };
}

export function getEventsFail(error) {
  return {
    type: GET_PROPERTY_EVENTS_FAIL,
    payload: error,
  };
}

export function getPropertyEventsFetch(propId) {
  return (dispatch) => {
    return axios({
      url: '/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `{getPropertyEvents(propertyId:"${propId}"){
       data{calendar{
        data{type,id,
          attributes{type,reservation,
            event{id,name,description,room_id,
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
            },
            room{id,name,slug,description,wifi_details,property_id,room_type_id,status,created_at,updated_at,moderated_at,moderated_by},
            state,
            start{date,timezone_type,timezone},
            end{date,timezone_type,timezone},
            links{rel,uri}
          }
        }
      }
    } 
                  
        }}`,
      }),
    })
    .then(response => dispatch(getEventsSuccess(response.data)))
    .catch(error => dispatch(getEventsFail(error)));
  };
}
