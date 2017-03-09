import axios from 'axios';
import { GraphQLString as StringType } from 'graphql';
import GetEventDetails from '../../types/Events/GetEventDetails';
import { apiHost } from '../../../config';

const getEventDetails = {
  type: GetEventDetails,
  args: {
    eventId: { type: StringType, description: 'Please provide a event ID' },
  },
  resolve(root, { eventId }) {
    return axios({
      url: `${apiHost}/api/v2/events/${eventId}`,
      method: 'get',
      data: {},
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });
  },
};

export default getEventDetails;
