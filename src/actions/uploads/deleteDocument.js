import axios from 'axios';

export const DELETE_DOCUMENT = 'ADD_DOCUMENT';
export const DELETE_DOCUMENT_SUCCESS = 'DELETE_DOCUMENT_SUCCESS';
export const DELETE_DOCUMENT_FAIL = 'DELETE_DOCUMENT_FAIL';

export function deleteDocumentSuccess({ data }) {
  return {
    type: DELETE_DOCUMENT_SUCCESS,
    data,
  };
}

export function deleteDocumentFail(error) {
  return {
    type: DELETE_DOCUMENT_FAIL,
    error,
  };
}

/**
  * Deleting an document associated with Property or Room
*/
export function deleteDocument(id) {

  return (dispatch) => {
    return axios({
      url: `/api/documents/${id}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      dispatch(deleteDocumentSuccess(response.data));
    })
    .catch(error => dispatch(deleteDocumentFail(error)));
  };
}
