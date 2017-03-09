import axios from 'axios';
import {
  GraphQLString as StringType,
  GraphQLInt as IntType,
 } from 'graphql';
import UploadDocumentType from '../../types/Uploads/UploadDocument';
import { apiHost } from '../../../config';

const uploadDocument = {
  type: UploadDocumentType,
  args: {
    document: { type: StringType, description: 'Please provide a file to upload' },
    name: { type: StringType, description: 'Please provide a room name' },
    object_id: { type: StringType, description: 'Please provide a object_id' },
    document_type_id: { type: StringType, description: 'Provide a document_type_id' },
    description: { type: StringType, description: 'Provide a description' },
  },
  resolve(root, context, {
    document,
    name,
    object_id,
    document_type_id,
    description }) {
      console.log('>>> root >>> ');
      console.log(root.request);
    return axios({
      url: `${apiHost}/api/v2/documents`,
      method: 'post',
      headers: {
        'content-type': 'multipart/form-data',
      },
      data: {
        document,
        name,
        object_id,
        document_type_id,
        description,
      },
    })
    .then((response) => {
      console.log(response.data.data);
      return response.data.data;
    })
    .catch((error) => {
      console.log('error.response.data >>> ^^^^');
      console.log(error.response.data);
      return error;
    });
  }
};

export default uploadDocument;
