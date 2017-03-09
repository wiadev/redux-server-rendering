import axios from 'axios';

export const GET_CUSTOMERS_SUCCESS = 'GET_CUSTOMERS_SUCCESS';
export const GET_CUSTOMERS_FAIL = 'GET_CUSTOMERS_FAIL';

export const getCustomersSuccess = ({ data }) => ({
  type: GET_CUSTOMERS_SUCCESS,
  payload: data,
});

export const getCustomersFail = (error) => ({
  type: GET_CUSTOMERS_FAIL,
  payload: error,
});

export function getCustomers(propId) {
  return (dispatch) => {
    return axios({
      url: '/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `{getCustomers(propId:"${propId}"){
          data{id,type,email,name,company,profile_img_url,created_at}
        }}`,
      }),
    })
    .then(response => dispatch(getCustomersSuccess(response.data)))
    .catch(error => dispatch(getCustomersFail(error)));
  };
}
