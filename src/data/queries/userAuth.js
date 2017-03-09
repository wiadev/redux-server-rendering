import { GraphQLList as List } from 'graphql';
import axios from 'axios';
import UserAuthType from '../types/UserAuth';
import API_KEY from '../../constants/apiKey';

import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';


// Bizly User Auth
let options = {
  "method": "POST",
  "hostname": "https://stg-api.bizly.co",
  "path": "/api/v2/auth/authenticate"
};

const url = `${options.hostname}${options.path}`;
let profile = {};

const userAuth = {
  type: UserAuthType,
  args: {
    email: { type: StringType, description: "Please provide an email" },
    password: { type: StringType, description: "Please provide a password" },
  },
  resolve(root, { email, password }) {
    console.log(url);
    return axios({
      url,
      method: 'post',
      headers: {
        "api-key": 'WHmTveE4xxfJWByLfgNmCkPzd62UCGJncmVchPWA9E2f4HD5v2dRdac7Tt4MGWbk',
        "content-type": "application/json",
        "cache-control": "no-cache"
      },
      data: {
        email,
        password
      }
    })
    .then( response => {
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.attributes.token}`;
      return response.data.data
    })
    .catch( error => error );
  }
};

export default userAuth;
