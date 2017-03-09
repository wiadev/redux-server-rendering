import axios from 'axios';
import {
  GraphQLString as StringType,
  GraphQLObjectType as ObjectType,
  GraphQLList as ListType,
} from 'graphql';
import { apiHost } from '../../../config';
import UploadDocument from '../../types/Uploads/UploadDocument';

const getPropertyDocuments = {
  type: new ObjectType({
    name: 'PropertyDocuments',
    fields: {
      data: { type: new ListType(UploadDocument) },
    },
  }),
  args: {
    propId: { type: StringType, description: 'Please provide a propId' },
  },
  resolve(root, { propId }) {
    const url = `${apiHost}/api/v2/properties/${propId}/documents`;
    return axios({
      url,
      method: 'get',
      headers: {
        'content-type': 'application/json',
        'cache-control': 'no-cache',
      },
    })
    .then(response => {
      return response.data;
    })
    .catch((error) => {
      console.log(error.response.data);
      return error;
    });
  },
};

export default getPropertyDocuments;
