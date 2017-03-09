import axios from 'axios';

export const GET_ADDRESSES_SUCCESS = 'GET_ADDRESSES_SUCCESS';
export const GET_ADDRESSES_FAIL = 'GET_ADDRESSES_FAIL';

export function getAddressesSuccess({ data }) {
  return {
    type: GET_ADDRESSES_SUCCESS,
    data,
  };
}

export function getAddressesFail(error) {
  return {
    type: GET_ADDRESSES_FAIL,
    error,
  };
}

export function getAddresses(term) {

  return (dispatch) => {
    return axios({
      url: '/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `{getAddresses(term:"${term}"){data{addresses{address,google_place_id}}}}`,
      }),

    })
      .then(response => dispatch(getAddressesSuccess(response.data)))
      .catch(error => dispatch(getAddressesFail(error)));
  };
}
