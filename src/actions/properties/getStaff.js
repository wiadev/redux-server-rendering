import axios from 'axios';
import cookie from 'react-cookie';

export const GET_STAFF = 'GET_STAFF';
export const GET_STAFF_SUCCESS = 'GET_STAFF_SUCCESS';
export const GET_STAFF_FAIL = 'GET_STAFF_FAIL';

export function getStaffSuccess({ data }) {
  return {
    type: GET_STAFF_SUCCESS,
    payload: data,
  };
}

export function getStaffFail(error) {
  return {
    type: GET_STAFF_FAIL,
    payload: error,
  };
}

export function getStaff(propId) {
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
        query: `{getStaff(propId:"${propId}"){
          data{id,type,email,name,company,profile_img_url,roles{id,name,slug,description,level} }
        }}`,
      }),
    })
    .then(response => dispatch(getStaffSuccess(response.data)))
    .catch(error => dispatch(getStaffFail(error)));
  };
}
