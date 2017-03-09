import { GraphQLList as List } from 'graphql';
import axios from 'axios';
import UserAuthType from '../types/UserAuth';
import { API_KEY } from '../../constants/apiKey';

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
  "path": "/api/v2/users/self"
};

const url = `${options.hostname}${options.path}`;
let profile = {};

const getCurrentUser = {
  type: UserAuthType,
  args: {
    auth_token: { type: StringType },
  },
  resolve(root, { auth_token }) {
    return axios({
      url: url,
      method: 'get',
      headers: {
        'api-key': API_KEY,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
        Authorization: `Bearer ${auth_token}`,
      }
    })
    .then((response) => {
      return response.data.data;
    })
    .catch((error) => {
      return error;
    });
  }
};

export default getCurrentUser;
