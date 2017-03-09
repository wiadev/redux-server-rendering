import axios from 'axios';
import {
  GraphQLString as StringType,
  GraphQLInputObjectType as InputObjectType,
  GraphQLInt as IntType,
  GraphQLFloat as FloatType,
  GraphQLBoolean as BoolType,
} from 'graphql';
import { propertyAmenity } from '../../types/common/propertyAmenity';
import { apiHost } from '../../../config';

const createAmenity = {
  type: propertyAmenity,
  args: {
    propAmenityId: { type: StringType, description: 'Please provide propAmenityId' },
    propId: { type: StringType, description: 'Please provide propId' },
    amenity_id: { type: StringType },
    included: { type: BoolType },
    flat_rate: { type: BoolType },
    notice_required: { type: BoolType },
    net_rate: { type: StringType },
    published_rate: { type: StringType },
    units: { type: StringType },
    disclaimer: { type: StringType },
    name: { type: StringType },
    description: { type: StringType },
  },
  resolve(root, { amenity_id, included, flat_rate, notice_required, net_rate, published_rate, units, disclaimer, name, description, propAmenityId, propId }) {
    const url = `${apiHost}/api/v2/properties/${propId}/amenities`;
    return axios({
      url,
      method: 'post',
      data: {
        amenity_id,
        included,
        flat_rate,
        notice_required,
        net_rate,
        published_rate,
        units,
        disclaimer,
        name,
        description,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        console.log('SUCCESS CREATING NEW amenity >>>> ');
        console.log(JSON.stringify(response.data));
        return response.data;
      })
      .catch((error) => {
        console.log('error.response.data');
        console.log(JSON.stringify(error.response.data));
        return error;
      });
  },
};

export default createAmenity;
