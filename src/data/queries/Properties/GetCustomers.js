import axios from 'axios';
import { GraphQLString as StringType } from 'graphql';
import GetCustomersType from '../../types/Properties/GetCustomers';
import { apiHost } from '../../../config';

const getCustomers = {
  type: GetCustomersType,
  args: {
    propId: { type: StringType, description: 'Please provide a property ID' },
  },
  resolve(root, { propId }) {
    const url = `${apiHost}/api/v2/properties/${propId}/customers?orderBy=name&sortedBy=asc`;
    return axios({
      url,
      method: 'get',
    })
    .then(response => response.data)
    .catch((error) => {
      console.log('get customers graphQL errors');
      console.log(error.response.data);
      return error;
    });
  }
};

export default getCustomers;
