import axios from 'axios';
import cookie from 'react-cookie';

export const GET_PROPERTY_DOCUMENETS = 'GET_PROPERTY_DOCUMENETS';
export const GET_PROPERTY_DOCUMENETS_FAIL = 'GET_PROPERTY_DOCUMENETS_FAIL';

export function getPropDocumentsSuccess({ data }) {
  return {
    type: GET_PROPERTY_DOCUMENETS,
    payload: data,
  };
}

export function getPropDocumentsFail(error) {
  return {
    type: GET_PROPERTY_DOCUMENETS_FAIL,
    payload: error,
  };
}

export function getPropDocuments(propId) {
  return (dispatch) => {
    return axios({
      url: '/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `{getPropertyDocuments(propId:"${propId}"){
          data{id,type,name,description,document_type_id,image_url,status,object_type,object_id,object{id,name,property_id,description}}
        }}`,
      }),
    })
    .then(response => dispatch(getPropDocumentsSuccess(response.data)))
    .catch(error => dispatch(getPropDocumentsFail(error)));
  };
}
