import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const REASSIGN_SHIFT = 'REASSIGN_SHIFT';
export const reassignShift = () => {
	return {
		type: REASSIGN_SHIFT
	};
};

export const REASSIGN_SUCCESS = 'REASSIGN_SUCCESS';
export const reassignSuccess = data => {
	return {
		type: REASSIGN_SUCCESS,
		data
	};
};

export const REASSIGN_ERROR = 'REASSIGN_ERROR';
export const reassignError = error => {
	return {
		type: REASSIGN_ERROR,
		error
	};
};

export const fetchReassignShift = (frameId, data) => dispatch => {
	const token = localStorage.getItem('authToken');
	dispatch(reassignShift());
	return fetch(`${API_BASE_URL}/frames/frame/${frameId}`, {
		method: 'PUT',
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : `Bearer ${token}`
		},
		body: JSON.stringify(data)
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(data => dispatch(reassignSuccess(data)))
		.catch(error => dispatch(reassignError(error.message)));
};
