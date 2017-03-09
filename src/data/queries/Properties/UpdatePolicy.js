import axios from 'axios';
import { GraphQLString as StringType } from 'graphql';
import { propertyPolicy } from '../../types/common/propertyPolicy';
import { apiHost } from '../../../config';

const updatePolicy = {
  type: propertyPolicy,
  args: {
    value: { type: StringType, description: 'Please provide value' },
    units: { type: StringType, description: 'Please provide units' },
    policyMapId: { type: StringType, description: 'Provide policy mapping Id' },
  },
  resolve(root, { value, units, policyMapId }) {

    const url = `${apiHost}/api/v2/policies/${policyMapId}`;
    console.log("url",url,value, units, policyMapId )
    return axios({
      url,
      method: 'put',
      data: {
        value,
        units
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(JSON.stringify(error.response.data));
        return error;
      });
  },
};

export default updatePolicy;
