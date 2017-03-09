import {
  GraphQLString as StringType,
} from 'graphql';
import axios from 'axios';
import UserAuthType from '../types/UserAuth';
import API_KEY from '../../constants/apiKey';


// Bizly User Auth
const options = {
  method: 'POST',
  hostname: 'https://stg-api.bizly.co',
  path: '/api/v2/auth/register',
};

const url = `${options.hostname}${options.path}`;
const userAuth = {
  type: UserAuthType,
  args: {
    email: { type: StringType, description: 'Please provide an email' },
    password: { type: StringType, description: 'Please provide a password' },
    name: { type: StringType },
  },
  resolve(root, { email, password, name }) {
    return axios({
      url,
      method: 'post',
      headers: {
        'api-key': 'WHmTveE4xxfJWByLfgNmCkPzd62UCGJncmVchPWA9E2f4HD5v2dRdac7Tt4MGWbk',
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
      data: {
        email,
        password,
        name,
      },
    })
    .then(response => response.data.data)
    .catch(error => error);
  },
};

export default userAuth;
