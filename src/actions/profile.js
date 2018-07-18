import API_BASE_URL from '../config';

const REQUEST_PROFILE = 'REQUEST_PROFILE';
const requestProfile = () => {
  return {
    type: REQUEST_PROFILE
  };
};
const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
const profileSuccess= data => {
  return {
    type: PROFILE_SUCCESS,
    data
  };
};
const PROFILE_ERROR = 'PROFILE_ERROR';
const profileError = error => {
  return {
    type: PROFILE_ERROR,
    error
  };
};

export const fetchProfile = (adminId) => dispatch => {
  dispatch(requestProfile());
  return fetch(`${API_BASE_URL}/admin/${adminId}`)
    .then(res => res.json())
    .then(data => {
      dispatch(profileSuccess(data));
    })
    .catch(error => {
      dispatch(profileError(error));
    });
};