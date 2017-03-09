import axios from 'axios';
import { GraphQLString as StringType } from 'graphql';
import GetInvoicesType from '../../types/Properties/GetInvoices';
import { apiHost } from '../../../config';

const getInvoices = {
  type: GetInvoicesType,
  args: {
    propId: { type: StringType, description: 'Please provide a property ID' },
  },
  resolve(root, { propId }) {
    const url = `${apiHost}/api/v2/properties/${propId}/invoices?orderBy=users|name`;
    return axios({
      url,
      method: 'get',
    })
    .then(response => response.data)
    .catch((error) => {
      console.log('get invoices graphQL errors');
      console.log(error.response.data);
      return error;
    });
  }
};

export default getInvoices;
