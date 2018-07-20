import {API_BASE_URL} from '../config';
import { logout } from './auth';
import { normalizeResponseErrors } from './utils';

// Request all admin user data, set loading to true
export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const requestProfile = () => {
	return {
		type: REQUEST_PROFILE
	};
};

// Set loading to false and load profile info into the state
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const profileSuccess= data => {
	return {
		type: PROFILE_SUCCESS,
		data
	};
};

//Set loading to flase and set error.message
export const PROFILE_ERROR = 'PROFILE_ERROR';
export const profileError = error => {
	return {
		type: PROFILE_ERROR,
		error
	};
};


// **************  GET PROFILE INFO  ************** //
// Must pass adminId in order to use for url
export const fetchProfile = adminId => dispatch => {
	const token = localStorage.getItem('authToken');
	dispatch(requestProfile());
	return fetch(`${API_BASE_URL}/admin/${adminId}`,{
		method : 'GET',
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : `Bearer ${token}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(data => {
			dispatch(profileSuccess(data));
		})
		.catch(error => {
			dispatch(profileError(error.message));
		});
};

// **************  EDIT PROFILE INFO  ************** //
export const editProfile = (adminId, updatedProfile) => dispatch => {
	const token = localStorage.getItem('authToken');
	dispatch(requestProfile());
	return fetch(`${API_BASE_URL}/admin/${adminId}`, {
		method : 'PUT',
		headers: {
			'Content-Type' : 'application/json',
			'Authorization' : `Bearer ${token}`
		},
		body : JSON.stringify(updatedProfile)})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(() => {
			dispatch(fetchProfile(adminId));
		})
		.catch(error => dispatch(profileError(error.message)));
};

// **************  DELETE PROFILE INFO  ************** //
export const deleteProfile = (adminId, history) => dispatch => {
	const token = localStorage.getItem('authToken');
	dispatch(requestProfile());
	return fetch(`${API_BASE_URL}/admin/${adminId}`, {
		method : 'DELETE',
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : `Bearer ${token}`
		}
	})
		.then(() => dispatch(logout(history)))
		.catch((error) => dispatch(profileError(error.message)));
};