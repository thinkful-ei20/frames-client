import {API_BASE_URL} from '../config';
import { logout } from './auth';
import { normalizeResponseErrors } from './utils';

export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const requestProfile = () => {
	return {
		type: REQUEST_PROFILE
	};
};
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS';
export const profileSuccess= data => {
	return {
		type: PROFILE_SUCCESS,
		data
	};
};
export const PROFILE_ERROR = 'PROFILE_ERROR';
export const profileError = error => {
	return {
		type: PROFILE_ERROR,
		error
	};
};


// **************  GET PROFILE INFO  ************** //
export const fetchProfile = adminId => dispatch => {
	const token = localStorage.getItem('authToken');
	dispatch(requestProfile());
	console.log('FETCH PROFILE RAN');
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
			dispatch(profileError(error));
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
			console.log('SUCCESS EDIT PROFILE');
			dispatch(fetchProfile(adminId));
		})
		.catch(err => dispatch(profileError(err)));
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
		.catch((error) => dispatch(profileError(error)));
};