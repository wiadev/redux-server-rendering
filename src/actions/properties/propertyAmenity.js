import axios from 'axios';

export const UPDATE_AMENITY_SUCCESS = 'UPDATE_AMENITY_SUCCESS';
export const UPDATE_AMENITY_FAIL = 'UPDATE_AMENITY_FAIL';
export const CREATE_AMENITY_SUCCESS = 'UPDATE_AMENITY_SUCCESS';
export const CREATE_AMENITY_FAIL = 'UPDATE_AMENITY_FAIL';

/**
  * Updating an existing property amenity
*/
export function updateAmenitySuccess({ data }) {
  return {
    type: UPDATE_AMENITY_SUCCESS,
    payload: data,
  };
}

export function updateAmenityFail(error) {
  console.log(error);
  return {
    type: UPDATE_AMENITY_FAIL,
    error,
  };
}

export function updateAmenity(formValues, propAmenityId, propId) {
  const {
    amenity_id,
    included,
    flat_rate,
    notice_required,
    net_rate,
    published_rate,
    units,
    disclaimer,
    name,
    description,
  } = formValues;

  return (dispatch) => {
    return axios({
      url: '/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `{updateAmenity(amenity_id:"${amenity_id}", included: ${included}, flat_rate: ${flat_rate}, notice_required: ${notice_required}, net_rate: "${net_rate}", published_rate: "${published_rate}", units: "${units}", disclaimer: "${disclaimer}", name: "${name}", description: "${description}", propAmenityId: "${propAmenityId}", propId: "${propId}"){
          id,type,attributes{name,description,amenity_id,notice_required}}
        }`,
      }),
    })
      .then(response => dispatch(updateAmenitySuccess(response.data)))
      .catch(error => dispatch(updateAmenityFail(error)));
  };
}

/**
  * Creating a new property amenity
*/
export function createAmenitySuccess({ data }) {
  return {
    type: UPDATE_AMENITY_SUCCESS,
    payload: data,
  };
}

export function createAmenityFail(error) {
  console.log(error);
  return {
    type: UPDATE_AMENITY_FAIL,
    error,
  };
}

export function createAmenity(formValues, propId) {
  const {
    amenity_id,
    included,
    flat_rate,
    notice_required,
    net_rate,
    published_rate,
    units,
    disclaimer,
    name,
    description,
  } = formValues;
  return (dispatch) => {
    return axios({
      url: '/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `{createAmenity(amenity_id:"${amenity_id}", included: ${included}, flat_rate: ${flat_rate}, notice_required: ${notice_required}, net_rate: "${net_rate}", published_rate: "${published_rate}", units: "${units}", disclaimer: "${disclaimer}", name: "${name}", description: "${description}",  propId: "${propId}"){
          id,type,attributes{name,description,amenity_id,notice_required}}
        }`,
      }),
    })
      .then(response => dispatch(createAmenitySuccess(response.data)))
      .catch(error => dispatch(createAmenityFail(error)));
  };
}
