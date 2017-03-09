import axios from 'axios';

export const GET_INVOICES_SUCCESS = 'GET_INVOICES_SUCCESS';
export const GET_INVOICES_FAIL = 'GET_INVOICES_FAIL';

export const getInvoicesSuccess = ({ data }) => ({
  type: GET_INVOICES_SUCCESS,
  payload: data,
});

export const getInvoicesFail = ({ error }) => ({
  type: GET_INVOICES_FAIL,
  payload: error,
});

export function getInvoices(propId) {
  return (dispatch) => {
    return axios({
      url: '/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `{getInvoices(propId:"${propId}"){
          data{id,type,customer_name,customer_id,room_name,room_id,start_time,end_time,supplier_total,bizly_total,state,created_at,updated_at}
        }}`,
      }),
    })
    .then(response => dispatch(getInvoicesSuccess(response.data)))
    .catch(error => dispatch(getInvoicesFail(error)));
  };
}
