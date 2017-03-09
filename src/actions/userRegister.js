import axios from 'axios';
import cookie from 'react-cookie';

export const USER_REGISTER_START = 'USER_REGISTER_START';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';

export function registerUserRequest({ email, password, name }) {
  return (dispatch) => {
    return axios({
      url: '/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `{userRegister(email:"${email}",password:"${password}", name:"${name}"){
            id,type,attributes{email,name},token}
          }`,
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
      axios.defaults.headers.common.auth_token = authToken;
      cookie.save('auth_token', authToken, { path: '/' });
      return dispatch(registerUserSuccess(response.data));
    })
    .catch(error => dispatch(registerUserFail(error)));
  };
}

export function registerUserSuccess({ data }) {
  return {
    type: USER_REGISTER_SUCCESS,
    user: data,
  };
}

export function registerUserFail(error) {
  return {
    type: USER_REGISTER_FAIL,
    error,
  };
}
