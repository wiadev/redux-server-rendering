import axios from 'axios';

export const UPLOAD_DOCUMENT = 'UPLOAD_DOCUMENT';
export const UPLOAD_DOCUMENT_SUCCESS = 'UPLOAD_DOCUMENT_SUCCESS';
export const UPLOAD_DOCUMENT_FAIL = 'UPLOAD_DOCUMENT_FAIL';

export function uploadDocumentSuccess({ data }) {
  return {
    type: UPLOAD_DOCUMENT_SUCCESS,
    data,
  };
}

export function uploadDocumentFail(error) {
  return {
    type: UPLOAD_DOCUMENT_FAIL,
    error,
  };
}

export function uploadDocumentRequest({ document, name, object_id, document_type_id, description, object_type, url = '/documents', type = 'Document' }) {
  /**
    * Preparing FormData with File object and additional meta data about the document
    * and submit the data to internal Node.js route which uploads the file to CDN and then to API
  */
  let data = new FormData();
  data.append('file', document);
  data.append('name', name);
  data.append('object_id', object_id);
  data.append('document_type_id', document_type_id);
  data.append('description', description);
  data.append('object_type', object_type);
  data.append('type', type);

  return (dispatch) => {
    return axios.post(url, data).then((response) => {
      dispatch(uploadDocumentSuccess(response));
      return response.data ? response.data.attributes : response;
    })
    .catch(error => dispatch(uploadDocumentFail(error)));
  };
}
