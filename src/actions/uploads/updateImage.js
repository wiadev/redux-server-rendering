import axios from 'axios';

export const UPDATE_IMAGE = 'UPDATE_IMAGE';
export const UPDATE_IMAGE_SUCCESS = 'UPDATE_IMAGE_SUCCESS';
export const UPDATE_IMAGE_FAIL = 'UPDATE_IMAGE_FAIL';

export function updateImageSuccess({ data }) {
  return {
    type: UPDATE_IMAGE_SUCCESS,
    data,
  };
}

export function updateImageFail(error) {
  return {
    type: UPDATE_IMAGE_FAIL,
    error,
  };
}

/**
  * Deleting an image associated with Property or Room
*/
export function updateImage(image) {
  const {
    name,
    description,
    type,
    id,
  } = image;

  return (dispatch) => {
    return axios({
      url: `/api/images/${id}`,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: image,
    })
    .then((response) => {
      dispatch(updateImageSuccess(response.data));
    })
    .catch(error => dispatch(updateImageFail(error)));
  };
}
