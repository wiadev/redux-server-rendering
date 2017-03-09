import axios from 'axios';

export const UPDATE_POLICY = 'UPDATE_POLICY';
export const UPDATE_POLICY_SUCCESS = 'UPDATE_POLICY_SUCCESS';
export const UPDATE_POLICY_FAIL = 'UPDATE_POLICY_FAIL';

export function updatePolicySuccess({ data }) {
  return {
    type: UPDATE_POLICY_SUCCESS,
    data,
  };
}

export function updatePolicyFail(error) {
  console.log(error);
  return {
    type: UPDATE_POLICY_FAIL,
    error,
  };
}

export function updatePolicy(formValues, policyMapId) {
  return (dispatch) => {
    return axios({
      url: '/graphql',
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: { query: `{updatePolicy(value:"${formValues.value}",units:"${formValues.units}",policyMapId:"${policyMapId}"){type,id,value,units}}`,
      },
    })
      .then(response => dispatch(updatePolicySuccess(response.data)))
      .catch(error => dispatch(updatePolicyFail(error)));
  };
}
