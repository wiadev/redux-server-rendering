import axios from 'axios';
import { urlProtocol } from '../config';
import { getUserRequest } from '../actions/user';
import { API_KEY } from '../constants/apiKey';

export default async function auth(req, res, next) {
  if (!req.cookies.auth_token && req.path !== '/login') {
    res.redirect('/login');
  } else {
    const store = req.store;
    const host = `${urlProtocol}://${req.headers.host}`;
    axios.defaults.baseURL = `${host}`;
    axios.defaults.headers.common['Authorization'] = `Bearer ${req.cookies.auth_token}`;
    axios.defaults.headers.common['api-key'] = API_KEY;
    await store.dispatch(getUserRequest(req.cookies.auth_token, host));
    next();
  }
}
