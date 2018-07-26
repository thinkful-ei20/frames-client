import {API_BASE_URL} from '../config';
import { fetchFrames } from './frames';
import { normalizeResponseErrors, getThisWeek } from './utils';
import { hideModal } from './modals';
import {SubmissionError} from 'redux-form';

// Set loading to true
export const REQUEST_EDIT_FRAME = 'REQUEST_EDIT_FRAME';
export const requestEditFrame = () => {
	return {
		type: REQUEST_EDIT_FRAME
	};
};

// Set loading to false and set error
export const EDIT_FRAME_ERROR = 'EDIT_FRAME_ERROR';
export const editFrameError = error => {
	console.log(error);
	return {
		type: EDIT_FRAME_ERROR,
		error
	};
};

// Asynch edit frame action to grab and store Frames array
export const editFrame = (frameId, updatedFrame) => dispatch => {
	dispatch(requestEditFrame());
	const token = localStorage.getItem('authToken');
	// Get Date information for next frames fetch
	const week = getThisWeek();

	return fetch(`${API_BASE_URL}/frames/frame/${frameId}`, {
		method : 'PUT',
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : `Bearer ${token}`
		},
		body: JSON.stringify(updatedFrame)
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(() => {
			dispatch(fetchFrames(week.start, week.end));
			dispatch(hideModal());
		})
		.catch(error => dispatch(editFrameError(error)));
};

export const addFrame = frame => dispatch => {
	dispatch(requestEditFrame());
	const token = localStorage.getItem('authToken');
	const week = getThisWeek();

	return fetch(`${API_BASE_URL}/frames/frame`, {
		method : 'POST',
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : `Bearer ${token}`
		},
		body: JSON.stringify(frame)
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(() => {
			dispatch(fetchFrames(week.start, week.end));
      dispatch(hideModal());

    })
    .catch(error => dispatch(editFrameError(error.message)));
};

export const deleteFrame = frameId => dispatch => {
	dispatch(requestEditFrame());
	const token = localStorage.getItem('authToken');
	const week = getThisWeek();

	return fetch(`${API_BASE_URL}/frames/frame/${frameId}`, {
		method: 'DELETE',
		headers: {
			// Provide our auth token as credentials
			Authorization: `Bearer ${token}`,
			'Content-type': 'application/json'
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(() => dispatch(fetchFrames(week.start, week.end)))
		.then(() => dispatch(hideModal()))
		.catch(error =>	dispatch(editFrameError(error)));
};
