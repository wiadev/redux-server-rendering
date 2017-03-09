import axios from 'axios';
import cookie from 'react-cookie';

export const GET_USER_PROPERTIES = 'GET_USER_PROPERTIES';
export const GET_USER_PROPERTIES_FAIL = 'GET_USER_PROPERTIES_FAIL';
export const GET_PROPERTIES_ROOMS = 'GET_PROPERTIES_ROOMS';

export function userPropertiesSuccess({ data }) {
  return {
    type: GET_USER_PROPERTIES,
    data: data.getUserProperties.data,
  };
}

export function userPropertiesRooms({ data }) {
  return {
    type: GET_PROPERTIES_ROOMS,
    data: data.getUserProperties.rooms,
  };
}

export function userPropertiesFail(error) {
  return {
    type: GET_USER_PROPERTIES_FAIL,
    error,
  };
}

export function userPropertiesRequest(userId, authToken, host) {
  return (dispatch, store) => {
    const token = authToken || cookie.load('auth_token');
    const id = userId || store().user.profile.id;
    const hostname = host || window.location.origin;
    return axios({
      url: `${hostname}/graphql`,
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `{getUserProperties(token:"${token}", userId:"${id}"){
          data{
            id,type,rooms{id,type},attributes{image_url,display_name,city,state,starting_at,details{updated_at,status}}
          },
          rooms{id,name}
        }}`,
      }),
      credentials: 'include',
    })
    .then(response => {
      dispatch(userPropertiesRooms(response.data));
      dispatch(userPropertiesSuccess(response.data));
    })
    .catch(error => dispatch(userPropertiesFail(error)));
  };
}
