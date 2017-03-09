import axios from 'axios';
import cookie from 'react-cookie';
import { API_KEY } from '../../constants/apiKey';

export const GET_SINGLE_PROPERTY = 'GET_SINGLE_PROPERTY';
export const GET_SINGLE_PROPERTY_SUCCESS = 'GET_SINGLE_PROPERTY_SUCCESS';
export const GET_SINGLE_PROPERTY_FAIL = 'GET_SINGLE_PROPERTY_FAIL';
export const SET_SELECTED_DAY = 'SET_SELECTED_DAY';

export function getPropertySuccess({ data }) {
  return {
    type: GET_SINGLE_PROPERTY_SUCCESS,
    data,
  };
}

export function getPropertyFail(error) {
  return {
    type: GET_SINGLE_PROPERTY_FAIL,
    error,
  };
}

export function getProperty(propId) {
  const authToken = cookie.load('auth_token');
  return (dispatch) => {
    return axios({
      url: '/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: JSON.stringify({
        query: `{getSingleProperty(token: "${authToken}", propId:"${propId}"){
          data{id,type,attributes{name,image_url,full_address,display_name,city,state,slug,contact_name,email,phone,city_id,
            details{ updated_at,status,deckline,terms_url,logo_url,executive_summary}}},
          policy{id,type,name,description,copy,value,mapping_id,policy_type_id}
          rooms{id,name,slug,description,status}
          allAmenities{id,type,attributes{name,description,amenity_id,parent_amenity_id,net_rate,published_rate,units,flat_rate,included,notice_required,disclaimer,created_at,min_amenity_lead_time,min_amenity_order_quantity}}
          foodAmenities{id,type,attributes{name,description,amenity_id,parent_amenity_id,net_rate,published_rate,units,flat_rate,included,notice_required,disclaimer,created_at,min_amenity_lead_time,min_amenity_order_quantity,iconUrl,
            fees{name,description,taxable,created_at,pivot{
              object_id,fee_definition_id,id,type,rate
            }},
            taxes{name,description,created_at,pivot{
              object_id,tax_definition_id,id,type,rate
            }}
          }}
          avAmenities{id,type,attributes{name,description,amenity_id,parent_amenity_id,net_rate,published_rate,units,flat_rate,included,notice_required,disclaimer,created_at,min_amenity_lead_time,min_amenity_order_quantity,iconUrl,
            fees{name,description,taxable,created_at,pivot{
              object_id,fee_definition_id,id,type,rate
            }},
            taxes{name,description,created_at,pivot{
              object_id,tax_definition_id,id,type,rate
            }}
          }}
          image{id,image_url,name,description,type,object_type,object_id,status}
          tag{id,name,description,type,priority,mapping_id}
          propertyDetails{id,property_id,description}
          relationships{id}
        }}`,
      }),
    })
    .then(response => dispatch(getPropertySuccess(response.data)))
    .catch(error => dispatch(getPropertyFail(error)));
  };
}

export function setSelectedDay(selectedDay) {
  return {
    type: SET_SELECTED_DAY,
    selectedDay,
  };
}
