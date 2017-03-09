import axios from 'axios';
import { GraphQLString as StringType } from 'graphql';
import RoomType from '../../types/Room/GetRoom';
import { API_KEY } from '../../../constants/apiKey';
import { apiHost } from '../../../config';

const getRoom = {
  type: RoomType,
  args: {
    roomId: { type: StringType, description: 'Please provide a room ID' },
    token: { type: StringType, description: 'Provide a user token' },
  },
  resolve(root, {
    token,
    roomId }) {
    const url = `${apiHost}/api/v2/rooms/${roomId}?include=amenities,ratePlans,policies,taxes,fees,blockedTimes`;
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
  },
};

export default getRoom;
