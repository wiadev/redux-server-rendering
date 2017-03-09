import axios from 'axios';

export const UPDATE_TAG_MAPPING = 'UPDATE_TAG_MAPPING';
export const UPDATE_TAG_MAPPING_FAIL = 'UPDATE_TAG_MAPPING_FAIL';
export const DELETE_TAG_MAPPING = 'DELETE_TAG_MAPPING';
export const DELETE_TAG_MAPPING_FAIL = 'DELETE_TAG_MAPPING_FAIL';
export const CREATE_TAG_MAPPING = 'CREATE_TAG_MAPPING';
export const CREATE_TAG_MAPPING_FAIL = 'CREATE_TAG_MAPPING_FAIL';

/**
  * Updating tags
*/
export function updateTagMappingSuccess({ data }) {
  return {
    type: UPDATE_TAG_MAPPING,
    payload: data,
  };
}

export function updateTagMappingFail(error) {
  return {
    type: UPDATE_TAG_MAPPING_FAIL,
    error,
  };
}

export function updateTagMapping(tagMappingId, tag) {
  return (dispatch) => {
    return axios({
      url: `/api/tags/${tagMappingId}`,
      method: 'put',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: tag,
    })
      .then(response => dispatch(updateTagMappingSuccess(response.data)))
      .catch(error => dispatch(updateTagMappingFail(error)));
  };
}

/**
  * Deleting tags
*/
export function deleteTagMappingSuccess({ data }) {
  return {
    type: DELETE_TAG_MAPPING,
    payload: data,
  };
}

export function deleteTagMappingFail(error) {
  return {
    type: DELETE_TAG_MAPPING_FAIL,
    error,
  };
}

export function deleteTagMapping(tagMappingId) {
  return (dispatch) => {
    return axios({
      url: `/api/tags/${tagMappingId}`,
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => dispatch(deleteTagMappingSuccess(response.data)))
      .catch(error => dispatch(deleteTagMappingFail(error)));
  };
}


/**
  * Creating tags
*/
export function createTagMappingSuccess({ data }) {
  return {
    type: CREATE_TAG_MAPPING,
    payload: data,
  };
}

export function createTagMappingFail(error) {
  return {
    type: CREATE_TAG_MAPPING_FAIL,
    error,
  };
}

export function createTagMapping(tag) {
  return (dispatch) => {
    return axios({
      url: '/api/tags',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: tag,
    })
      .then(response => dispatch(createTagMappingSuccess(response.data)))
      .catch(error => dispatch(createTagMappingFail(error)));
  };
}
