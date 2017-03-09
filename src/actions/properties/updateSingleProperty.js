import axios from 'axios';
import cookie from 'react-cookie';
import { API_KEY } from '../../constants/apiKey';

export const UPDATE_SINGLE_PROPERTY = 'UPDATE_SINGLE_PROPERTY';
export const UPDATE_SINGLE_PROPERTY_SUCCESS = 'UPDATE_SINGLE_PROPERTY_SUCCESS';
export const UPDATE_SINGLE_PROPERTY_FAIL = 'UPDATE_SINGLE_PROPERTY_FAIL';

export function updatePropertySuccess({ data }) {
  return {
    type: UPDATE_SINGLE_PROPERTY_SUCCESS,
    data,
  };
}

export function updatePropertyFail(error) {
  console.log(error);
  return {
    type: UPDATE_SINGLE_PROPERTY_FAIL,
    error,
  };
}

export function updateProperty(formValues, propId) {
  const authToken = cookie.load('auth_token');
  const values = JSON.stringify(formValues).replace(/\"([^"]+)\":/g,"$1:").replace(/\uFFFF/g,"\\\"");
  return (dispatch) => {
    return axios({
      url: '/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: { query: `{updateSingleProperty(formValues: "${JSON.stringify(formValues).replace(/"/g, "\\\"")}",propId:"${propId}",token: "${authToken}"){
          data{id,type,attributes{name,image_url,full_address,display_name,city,state,slug,contact_name,email,phone,city_id,
            details{ updated_at,status,deckline,terms_url,logo_url,executive_summary}}},
        }}`,
      },
    })
    .then(response => dispatch(updatePropertySuccess(response.data)))
    .catch(error => dispatch(updatePropertyFail(error)));
  };
}
