import axios from 'axios';
import { GraphQLString as StringType } from 'graphql';
import AllTags from '../types/AllTags';
import { apiHost } from '../../config';

const getAllTags = {
  type: AllTags,
  resolve() {
    return axios({
      url: `${apiHost}/api/v2/tags`,
      method: 'get',
      headers: {
        'content-type': 'application/json',
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error.response.data);
      return error;
    });
  },
};

export default getAllTags;
