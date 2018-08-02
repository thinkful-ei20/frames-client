import {SubmissionError} from 'redux-form';
import { login } from './auth';
import {API_BASE_URL} from '../config';
import { normalizeResponseErrors } from './utils';

// Create a new admin user, login immediately after
export const createUser = user => dispatch => {
	return fetch(`${API_BASE_URL}/admin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(user)
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(res => {
			dispatch(login(user.username, user.password));
		})
		.catch(error => {
			console.log(error);
			const {message} = error;
			return Promise.reject( new SubmissionError({_error : message}));
		});
};