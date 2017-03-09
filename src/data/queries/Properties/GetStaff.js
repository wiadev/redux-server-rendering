import axios from 'axios';
import { GraphQLString as StringType } from 'graphql';
import GetStaffType from '../../types/Properties/GetStaff';
import { apiHost } from '../../../config';

const getStaff = {
  type: GetStaffType,
  args: {
    propId: { type: StringType, description: 'Please provide a property ID' },
  },
  resolve(root, { propId }) {
    const url = `${apiHost}/api/v2/properties/${propId}/staff?include=notifications`;
    return axios({
      url,
      method: 'get',
    })
    .then(response => response.data)
    .catch((error) => {
      console.log('get staff graphQL errors');
      console.log(error.response.data);
      return error;
    });
  }
};

export default getStaff;
