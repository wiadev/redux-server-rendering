import axios from 'axios';
import { GraphQLString as StringType } from 'graphql';
import NewRoomType from '../../types/Room/AddRoom';
import { API_KEY } from '../../../constants/apiKey';
import { ADD_ROOM_API } from '../../api/Rooms';

const addRoom = {
  type: NewRoomType,
  args: {
    token: { type: StringType, description: 'Provide a user token' },
    name: { type: StringType, description: 'Please provide a room name' },
    slug: { type: StringType, description: 'Please provide a slug' },
    description: { type: StringType, description: 'Provide a description' },
    wifi_details: { type: StringType, description: 'Provide a wifi details' },
    property_id: { type: StringType, description: 'Provide the property id' },
    room_type_id: { type: StringType, description: 'Provide the room type id' },
  },
  resolve(root, {
    token,
    name,
    slug,
    description,
    wifi_details,
    property_id,
    room_type_id }) {
    return axios({
      url: ADD_ROOM_API,
      method: 'post',
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
        property_id,
        room_type_id,
      },
    })
    .then((response) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error;
    });
  }
};

export default addRoom;
