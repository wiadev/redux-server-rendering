import axios from 'axios';
import { GraphQLString as StringType } from 'graphql';
import NewPropertyType from '../../types/Properties/CreateProperty';
import { API_KEY } from '../../../constants/apiKey';
import { CREATE_PROPERTY_API } from '../../api/Properties';

const createProperty = {
  type: NewPropertyType,
  args: {
    name: { type: StringType, description: 'Please provide a property name' },
    full_address: { type: StringType, description: 'Provide an address' },
    contact_name: { type: StringType, description: 'Provide a contact name' },
    email: { type: StringType, description: 'Provide an email' },
    token: { type: StringType, description: 'Provide a user token' },
    room_commission_rate: { type: StringType, description: 'Room commission' },
    amenity_commission_rate: { type: StringType, description: 'Amenity' },
  },
  resolve(root, {
    token,
    name,
    full_address,
    contact_name,
    email,
    room_commission_rate,
    amenity_commission_rate }) {
    return axios({
      url: CREATE_PROPERTY_API,
      method: 'post',
      headers: {
        'api-key': API_KEY,
        'content-type': 'application/json',
        'cache-control': 'no-cache',
        Authorization: `Bearer ${token}`,
      },
      data: {
        property_type_id: '1',
        name,
        full_address,
        contact_name,
        email,
        details: {
          room_commission_rate,
          amenity_commission_rate,
        },
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

export default createProperty;
