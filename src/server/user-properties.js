import { urlProtocol } from '../config';
import { userPropertiesRequest } from '../actions/user/properties';

export default async function userProperties(req, res, next) {
  if (req.cookies.auth_token) {
    const store = req.store;
    const userId = store.getState().user.profile.id;
    const userToken = req.cookies.auth_token;
    const host = `${urlProtocol}://${req.headers.host}`;
    await store.dispatch(userPropertiesRequest(userId, userToken, host));
  }
  next();
}
