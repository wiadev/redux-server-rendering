import axios from 'axios';
import { GraphQLString as StringType } from 'graphql';
import GetRoom from '../types/Room/GetRoom';
import { API_KEY } from '../../constants/apiKey';
import { apiHost } from '../../config';

const room = {
  type: GetRoom,
  args: {
    token: { type: StringType, description: 'Please provide a token' },
    roomId: { type: StringType, description: 'Please provide a room Id' },
  },
  resolve(root, { token, roomId }) {
    return axios({
      url: `${apiHost}/api/v2/rooms/${roomId}?include=amenities,ratePlans,policies,amenities.taxes,amenities.fees,taxes,fees,amenities.policies`,
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

export default room;
