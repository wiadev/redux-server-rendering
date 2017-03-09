import cookie from 'react-cookie';
import * as userActions from '../actions/user';

const userInitState = {
  auth: false,
  auth_token: null,
  profile: {},
};

export default function user(state = userInitState, action) {
  switch (action.type) {
    case userActions.USER_AUTH_SUCCESS:
      return {
        ...state,
        auth: true,
        profile: action.user.userAuth,
      };
      break;
    case userActions.USER_GET_SUCCESS:
      return {
        ...state,
        auth: true,
        profile: action.user.getCurrentUser,
      };
      break;
    case userActions.USER_AUTH_OUT:
      cookie.remove('auth_token');
      return {
        ...state,
        auth: false,
        auth_token: null,
        profile: {},
      };
      break;
    default:
      return state;
  }
}
