import cookie from 'react-cookie';
import * as userActions from '../actions/userRegister';

const userInitState = {
  auth: false,
  auth_token: null,
  profile: {},
};

export default function user(state = userInitState, action) {
  switch (action.type) {
    case userActions.USER_REGISTER_SUCCESS:
      return {
        ...state,
        auth: true,
        profile: action.user.userAuth,
      };
      break;
    default:
      return state;
  }
}
