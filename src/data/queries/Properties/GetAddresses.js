import axios from 'axios';
import { GraphQLString as StringType } from 'graphql';
import { propertyAddresses } from '../../types/common/propertyAddresses';
import { apiHost } from '../../../config';

const getAddresses = {
  type: propertyAddresses,
  args: {
    term: { type: StringType, description: 'Please provide term' },
  },
  resolve(root, { term }) {
    const url = `${apiHost}/api/v2/geo/autocomplete?term=${term}`;
    return axios({
      url,
      method: 'get',
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
        return error;
      });
  },
};

export default getAddresses;
