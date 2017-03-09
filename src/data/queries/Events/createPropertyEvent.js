import axios from 'axios';
import { GraphQLString as StringType } from 'graphql';
import CreatePropertyEvent from '../../types/Events/CreatePropertyEvent';
import { apiHost } from '../../../config';

const createPropertyEvent = {
  type: CreatePropertyEvent,
  args: {
    name: { type: StringType, description: 'Please provide a Event name' },
    description: { type: StringType, description: 'Please provide a Event description' },
    room_id: { type: StringType, description: 'Please provide a Event room_id' },
    date: { type: StringType, description: 'Please provide a Event date' },
    start_time: { type: StringType, description: 'Please provide a Event start_time' },
    duration: { type: StringType, description: 'Please provide a Event duration' },
  },
  resolve(root, { name, description, room_id, date, start_time, duration }) {

    return axios({
      url: `${apiHost}/api/v2/events/`,
      method: 'post',
      data: {
        name,
        description,
        room_id,
        date,
        start_time,
        duration,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });
  },
};

export default createPropertyEvent;
