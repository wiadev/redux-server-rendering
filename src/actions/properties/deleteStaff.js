import axios from 'axios';

export const DELETE_STAFF = 'DELETE_STAFF';
export const DELETE_STAFF_SUCCESS = 'DELETE_STAFF_SUCCESS';
export const DELETE_STAFF_FAIL = 'DELETE_STAFF_FAIL';

export function deleteStaffSuccess({ data }) {
  return {
    type: DELETE_STAFF_SUCCESS,
    payload: data,
  };
}

export function deleteStaffFail(error) {
  return {
    type: DELETE_STAFF_FAIL,
    payload: error,
  };
}

export function deleteStaff(propId, member) {
  const { id } = member;
  return (dispatch) => {
    return axios({
      url: `/api/properties/${propId}/staff/${id}`,
      method: 'delete',
    })
    .then(response => dispatch(deleteStaffSuccess(response.data)))
    .catch(error => dispatch(deleteStaffFail(error)));
  };
}
