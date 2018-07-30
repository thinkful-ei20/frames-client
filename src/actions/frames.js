import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

// Set loading to true
export const REQUEST_FRAMES = 'REQUEST_FRAMES';
export const requestFrames = () => {
	return {
		type : REQUEST_FRAMES
	};
};

// Set loading to false and update frames state
export const FRAMES_SUCCESS = 'FRAMES_SUCCESS';
export const framesSuccess = data => {
	return {
		type : FRAMES_SUCCESS,
		data
	};
};

// Set loading to false and update error.message
export const FRAMES_ERROR = 'FRAMES_ERROR';
export const framesError = error => {
	return {
		type : FRAMES_ERROR,
		error
	};
};

// Change view
export const SET_FRAMES_VIEW = 'SET_FRAMES_VIEW';
export const setFramesView = view => {
	return {type : SET_FRAMES_VIEW,
		view};
};

// Fech all frames for a certain time span- must match current logged in user's adminID
export const fetchFrames = (start, end) => dispatch => {
	const token = localStorage.getItem('authToken');
	dispatch(requestFrames());
	return fetch(`${API_BASE_URL}/frames/?startDate=${start}&endDate=${end}`, {
		method : 'GET',
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : `Bearer ${token}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(data => {
			dispatch(framesSuccess(data));
		})
		.catch(error => {
			dispatch(framesError(error.message));
		});
};