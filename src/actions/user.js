import axios from 'axios';
import cookie from 'react-cookie';

export const USER_AUTH_START = 'USER_AUTH_START';
export const USER_AUTH_SUCCESS = 'USER_AUTH_SUCCESS';
export const USER_AUTH_FAIL = 'USER_AUTH_FAIL';
export const USER_AUTH_OUT = 'USER_AUTH_OUT';
export const USER_GET_SUCCESS = 'USER_GET_SUCCESS';
export const USER_GET_FAIL = 'USER_GET_FAIL';

export function authUserSuccess({ data }) {
  return {
    type: USER_AUTH_SUCCESS,
    user: data,
  };
}

export function authUserFail(error) {
  return {
    type: USER_AUTH_FAIL,
    error,
  };
}

const userQuery = 'id,type,attributes{email,name,profile_img_url,phone,last_login,roles{id,name,slug,description,level}},token';

export function authUserRequest({ email, password }) {
  return (dispatch) => {
    return axios({
      url: '/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `{userAuth(email:"${email}",password:"${password}"){${userQuery}}}`,
      }),
      credentials: 'include',
    })
    .then((response) => {
      /**
        * Get user's auth token and save in axios for all future calls
        * Save token to cookie
        * @todo figure out exp time for the token
      */
      const authToken = response.data.data.userAuth.token;
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
      cookie.save('auth_token', authToken, { path: '/', maxAge: 5800 });
      return dispatch(authUserSuccess(response.data));
    })
    .catch(error => dispatch(authUserFail(error)));
  };
}

/**
  * When user has previously signed and the session is still valid we can get user profile
  * With GetCurrentUser API
*/
export function getUserSuccess({ data }) {
  return {
    type: USER_GET_SUCCESS,
    user: data,
  };
}

export function getUserFail(error) {
  return {
    type: USER_GET_FAIL,
    error,
  };
}

export function getUserRequest(token, host) {
  return (dispatch) => {
    const authToken = token || cookie.load('auth_token');
    const hostname = host || window.location.origin;
    console.log(`>>>>>>>> the hostname for getUserRequest is ${hostname} >>>>>>>>`);
    return axios({
      url: `${hostname}/graphql`,
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `{getCurrentUser(auth_token:"${authToken}"){
          ${userQuery}
        }}`,
      }),
      credentials: 'include',
    })
    .then(response => dispatch(getUserSuccess(response.data)))
    .catch(error => dispatch(getUserFail(error)));
  };
}


export function userLogout() {
  return {
    type: USER_AUTH_OUT,
  };
}
