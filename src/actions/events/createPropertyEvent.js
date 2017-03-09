 import axios from 'axios';

export const CREATE_PROPERTY_EVENT = 'CREATE_PROPERTY_EVENT';
export const CREATE_PROPERTY_EVENT_SUCCESS = 'CREATE_PROPERTY_EVENT_SUCCESS';
export const CREATE_PROPERTY_EVENT_FAIL = 'CREATE_PROPERTY_EVENT_FAIL';

export function createEventSuccess({ data }) {
  return {
    type: CREATE_PROPERTY_EVENT_SUCCESS,
    data,
  };
}

export function createEventFail(error) {
  return {
    type: CREATE_PROPERTY_EVENT_FAIL,
    error,
  };
}

export function createPropertyEvent(form) {
  let {
    eventName,
    eventDescription,
    eventRoomId,
    eventDate,
    eventStartTime,
    eventDuration,
  } = form;

  return (dispatch) => {
    return axios({
      url: '/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `{createPropertyEvent(
        name:"${eventName}", 
        description:"${eventDescription}", 
        room_id:"${eventRoomId}", 
        date:"${eventDate}", 
        start_time:"${eventStartTime}", 
        duration:"${eventDuration}"
        ){data{type,id,attributes{name,description,room_id,
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
      .then(response => dispatch(createEventSuccess(response.data)))
      .catch(error => dispatch(createEventFail(error)));
  };
}
