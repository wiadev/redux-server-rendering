import axios from 'axios';
import { GraphQLString as StringType } from 'graphql';
import SinglePropertyType from '../../types/Properties/GetSingleProperty';
import { API_KEY } from '../../../constants/apiKey';
import { apiHost } from '../../../config';

const getSingleProperty = {
  type: SinglePropertyType,
  args: {
    propId: { type: StringType, description: 'Please provide a property ID' },
    token: { type: StringType, description: 'Provide a user token' },
  },
  resolve(root, {
    token,
    propId }) {
    const url = `${apiHost}/api/v2/properties/${propId}?include=details,images,policies,rooms,amenities,tags`;
    return axios({
      url,
      method: 'get',
      headers: {
        'api-key': API_KEY,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data)
    .catch((error) => {
      console.log(error.response.data);
      return error;
    });
  }
};

export default getSingleProperty;
