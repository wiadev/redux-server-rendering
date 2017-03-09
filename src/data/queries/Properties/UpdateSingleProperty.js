import axios from 'axios';
import { GraphQLString as StringType } from 'graphql';
import SinglePropertyType from '../../types/Properties/GetSingleProperty';
import { PropertyInputAttributes } from '../../types/common/propertyInputAttributes';
import { apiHost } from '../../../config';

const updateSingleProperty = {
  type: SinglePropertyType,
  args: {
    formValues: { type: StringType, description: 'Please provide form values' },
    propId: { type: StringType, description: 'Provide property ID' },
    token: { type: StringType, description: 'Provide a user token' },
  },
  resolve(root, { formValues, propId }) {
    const url = `${apiHost}/api/v2/properties/${propId}`;
    return axios({
      url,
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: formValues,
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

export default updateSingleProperty;
