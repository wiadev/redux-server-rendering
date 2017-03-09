import axios from 'axios';
import { GraphQLString as StringType } from 'graphql';
import UpdateRoomType from '../../types/Room/GetRoom';
import { API_KEY } from '../../../constants/apiKey';
import { ADD_ROOM_API } from '../../api/Rooms';

const updateRoom = {
  type: UpdateRoomType,
  args: {
    token: { type: StringType, description: 'Provide a user token' },
    name: { type: StringType, description: 'Please provide a room name' },
    slug: { type: StringType, description: 'Please provide a slug' },
    description: { type: StringType, description: 'Provide a description' },
    wifi_details: { type: StringType, description: 'Provide a wifi details' },
    room_type_id: { type: StringType, description: 'Provide the room type id' },
    area: { type: StringType, description: 'Provide an area' },
    location: { type: StringType, description: 'Provide a location' },
    roomId: { type: StringType, description: 'Provide the room Id' },
  },
  resolve(root, {
    token,
    name,
    slug,
    description,
    wifi_details,
    room_type_id,
    area,
    location,
    roomId }) {
    return axios({
      url: `${ADD_ROOM_API}/${roomId}`,
      method: 'put',
      headers: {
        'api-key': API_KEY,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
        Authorization: `Bearer ${token}`,
      },
      data: {
        name,
        slug,
        description,
        wifi_details,
        room_type_id,
        area,
        location,
      },
    })
    .then((response) => {
      console.log(response.data.data);
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error;
    });
  }
};

export default updateRoom;
