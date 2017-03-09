import axios from 'axios';
import cookie from 'react-cookie';
import { reset } from 'redux-form';
import { API_KEY } from '../../constants/apiKey';

export const CREATE_PROPERTY = 'CREATE_PROPERTY';
export const CREATE_PROPERTY_SUCCESS = 'CREATE_PROPERTY_SUCCESS';
export const CREATE_PROPERTY_FAIL = 'CREATE_PROPERTY_FAIL';

export function createPropertySuccess({ data }) {
  return {
    type: CREATE_PROPERTY_SUCCESS,
    data,
  };
}

export function createPropertyFail(error) {
  return {
    type: CREATE_PROPERTY_FAIL,
    error,
  };
}

export function createProperty(form) {
  const authToken = cookie.load('auth_token');
  const {
    propName,
    contactName,
    contactEmail,
    propAddress,
    amenityPercentageAmount,
    roomPercentageAmount,
  } = form;
  return (dispatch) => {
    return axios({
      url: '/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `{createProperty(token: "${authToken}", name:"${propName}", contact_name:"${contactName}", full_address: "${propAddress}", email: "${contactEmail}", amenity_commission_rate: "${amenityPercentageAmount}", room_commission_rate: "${roomPercentageAmount}"){
          id,type,attributes{image_url,display_name,city,state,starting_at,details{ updated_at,status}}}
        }`,
      }),
    })
    .then((response) => {
      dispatch(reset('newProperty'));
      dispatch(createPropertySuccess(response.data));
    })
    .catch(error => dispatch(createPropertyFail(error)));
  };
}
