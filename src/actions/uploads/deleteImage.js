import axios from 'axios';

export const DELETE_IMAGE = 'ADD_IMAGE';
export const DELETE_IMAGE_SUCCESS = 'DELETE_IMAGE_SUCCESS';
export const DELETE_IMAGE_FAIL = 'DELETE_IMAGE_FAIL';

export function deleteImageSuccess({ data }) {
  return {
    type: DELETE_IMAGE_SUCCESS,
    data,
  };
}

export function deleteImageFail(error) {
  return {
    type: DELETE_IMAGE_FAIL,
    error,
  };
}

/**
  * Deleting an image associated with Property or Room
*/
export function deleteImage(image) {
  const {
    name,
    description,
    object_type,
    object_id,
    type,
    id,
  } = image;

  return (dispatch) => {
    return axios({
      url: `/api/images/${id}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      dispatch(deleteImageSuccess(response.data));
    })
    .catch(error => dispatch(deleteImageFail(error)));
  };
}
