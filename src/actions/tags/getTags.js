import axios from 'axios';

export const GET_ALL_TAGS = 'GET_ALL_TAGS';
export const GET_ALL_TAGS_FAIL = 'GET_ALL_TAGS_FAIL';

export function getTagsSuccess({ data }) {
  return {
    type: GET_ALL_TAGS,
    payload: data,
  };
}

export function getTagsFail(error) {
  return {
    type: GET_ALL_TAGS_FAIL,
    payload: error,
  };
}

export function getAllTags() {
  return (dispatch) => {
    return axios({
      url: '/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `{getAllTags{
          data{id,name,description,type,priority,mapping_id}
        }}`,
      }),
    })
    .then(response => dispatch(getTagsSuccess(response.data)))
    .catch(error => dispatch(getTagsFail(error)));
  };
}
