import axios from 'axios';
import { GraphQLString as StringType } from 'graphql';
import UserPropertiesType from '../types/Properties/UserProperties';
import { API_KEY } from '../../constants/apiKey';
import { apiHost } from '../../config';

const getUserProperties = {
  type: UserPropertiesType,
  args: {
    token: { type: StringType, description: 'Please provide a token' },
    userId: { type: StringType, description: 'Please provide a user ID' },
  },
  resolve(root, { token, userId }) {
    return axios({
      url: `${apiHost}/api/v2/users/${userId}/properties?include=rooms`,
      method: 'get',
      headers: {
        'api-key': API_KEY,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data)
    .catch(error => error);
  },
};

export default getUserProperties;
