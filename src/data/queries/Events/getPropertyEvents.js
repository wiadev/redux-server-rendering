import axios from 'axios';
import { GraphQLString as StringType } from 'graphql';
import GetPropertyEvents from '../../types/Events/GetPropertyEvents';
import { apiHost } from '../../../config';

const getPropertyEvents = {
  type: GetPropertyEvents,
  args: {
    propertyId: { type: StringType, description: 'Please provide a property ID' },
  },
  resolve(root, { propertyId }) {
    return axios({
      url: `${apiHost}/api/v2/properties/${propertyId}/calendar`,
      method: 'get',
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      return error;
    });
  },
};

export default getPropertyEvents;
