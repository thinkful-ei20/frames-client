import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const REQUEST_FRAMES = 'REQUEST_FRAMES';
export const requestFrames = () => {
	return {
		type : REQUEST_FRAMES
	};
};

export const FRAMES_SUCCESS = 'FRAMES_SUCCESS';
export const framesSuccess = data => {
	return {
		type : FRAMES_SUCCESS,
		data
	};
};

export const FRAMES_ERROR = 'FRAMES_ERROR';
export const framesError = error => {
	return {
		type : FRAMES_ERROR,
		error
	};
};

export const fetchFrames = (start, end) => dispatch => {
	console.log('START DATE', start);
	console.log('END DATE', end);
	const token = localStorage.getItem('authToken');
	console.log('TOKEN', token);
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
			console.log('FRAMES DATA', data);
			dispatch(framesSuccess(data))
    })
		.catch(error => {
			console.log('ERROR FETCHING FRAMES', error);
			dispatch(framesError(error.message))
    });
};