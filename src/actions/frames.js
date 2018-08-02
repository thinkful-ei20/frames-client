import { API_BASE_URL } from '../config';
import { normalizeResponseErrors, getThisWeek} from './utils';
import { hideModal } from './modals';

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

export const CLEAR_FRAME_ERROR = 'CLEAR_FRAME_ERROR';
export const clearFrameError = () => {
	return {
		type: CLEAR_FRAME_ERROR
	};
};

// Change view
export const SET_FRAMES_VIEW = 'SET_FRAMES_VIEW';
export const setFramesView = view => {
	return {
		type : SET_FRAMES_VIEW,
		view
	};
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

// Asynch edit frame action to grab and store Frames array
export const editFrame = (frameId, updatedFrame) => dispatch => {
	dispatch(requestFrames());
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
		.catch(error => {
			dispatch(framesError(error.message));
		});
};

export const addFrame = frame => dispatch => {
	dispatch(requestFrames());
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
		.catch(error => dispatch(framesError(error.message)));
};

export const deleteFrame = frameId => dispatch => {
	dispatch(requestFrames());
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
		.then(() => {
			dispatch(fetchFrames(week.start, week.end));
      dispatch(hideModal());
    })
		.catch(error =>	{
			dispatch(framesError(error))
    });
};