import axios from 'axios';

export const ADD_STAFF = 'ADD_STAFF';
export const ADD_STAFF_SUCCESS = 'ADD_STAFF_SUCCESS';
export const ADD_STAFF_FAIL = 'ADD_STAFF_FAIL';

export function addStaffSuccess({ data }) {
  return {
    type: ADD_STAFF_SUCCESS,
    payload: data,
  };
}

export function addStaffFail(error) {
  return {
    type: ADD_STAFF_FAIL,
    payload: error,
  };
}

export function addStaff(propId, member) {
  const { email, role_id } = member;
  return (dispatch) => {
    return axios({
      url: `/api/properties/${propId}/staff`,
      method: 'post',
      data: {
        email,
        role_id,
      },
    })
    .then(response => dispatch(addStaffSuccess(response.data)))
    .catch(error => dispatch(addStaffFail(error)));
  };
}
