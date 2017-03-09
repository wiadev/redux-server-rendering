import configureStore from '../store/configureStore';
import { setRuntimeVariable } from '../actions/runtime';

export default function configStore(req, res, next) {
  const store = configureStore({
    user: {
      auth: req.cookies.auth_token ? req.cookies.auth_token : null,
      auth_token: req.cookies.auth_token,
      profile: {},
    },
  }, {
    // cookie: req.headers.cookie,// TODO: handle auth on server
  });

  store.dispatch(setRuntimeVariable({
    name: 'initialNow',
    value: Date.now(),
  }));

  req.store = store;
  next();
}
