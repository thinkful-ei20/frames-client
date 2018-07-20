import { API_BASE_URL } from '../config';
import { normalizeResponseErrors, getThisWeek } from './utils';
import { hideModal } from './modals';
import { fetchFrames } from './frames';

// Uses frame reducer to set loading to true
export const REASSIGN_SHIFT = 'REASSIGN_SHIFT';
export const reassignShift = () => {
	return {
		type: REASSIGN_SHIFT
	};
};


export const REASSIGN_ERROR = 'REASSIGN_ERROR';
export const reassignError = error => {
	return {
		type: REASSIGN_ERROR,
		error
	};
};

// Send a put request to /api/frames/frame/:frameId with {employeId : '124'}
// On Success, fetch frames again and close the modal
export const fetchReassignShift = (frameId, data) => dispatch => {
	const token = localStorage.getItem('authToken');
	// Get Date information for next frames fetch
	const today = getThisWeek();
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
		.then(() => {
			dispatch(fetchFrames(today.start, today.end));
			dispatch(hideModal());
		})
		.catch(error => dispatch(reassignError(error.message)));
};
