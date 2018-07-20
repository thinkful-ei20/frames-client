import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form';
import { API_BASE_URL } from '../config';
import {normalizeResponseErrors} from './utils';

export const SET_TOKEN = 'SET_TOKEN';
export const setToken = token => {
	return {
		type: SET_TOKEN,
		token
	};
};

export const CLEAR_TOKEN = 'CLEAR_TOKEN';
export const clearToken = () => {
	return {
		type: CLEAR_TOKEN
	};
};

export const REQUEST_LOGIN = 'REQUEST_LOGIN';
export const requestLogin = () => {
	return {
		type: REQUEST_LOGIN
	};
};

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const loginSuccess = user => {
	return {
		type: LOGIN_SUCCESS,
		user
	};
};

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const loginError = error => {
	return {
		type: LOGIN_ERROR,
		error
	};
};

//Store in localStorage & decompose into state
export const storeToken = (token, dispatch) => {
	const decodedToken = jwtDecode(token);
	dispatch(setToken(decodedToken));
  localStorage.setItem('authToken', token);
  dispatch(loginSuccess(decodedToken.user));
};

// Asynch login call
export const login = (username, password) => dispatch => {
	dispatch(requestLogin());
	return (
		fetch(`${API_BASE_URL}/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				username,
				password
			})
		})
			.then(res => normalizeResponseErrors(res))
			.then(res => res.json())
			.then(({authToken}) => storeToken(authToken, dispatch))
			.catch(error => {
				console.log('LOGIN ERROR', error);
				const {status} = error.error;
				const message = status === 401 ? 'Incorrect username or password' : 'Unable to login , please try again';
				dispatch(loginError(error));
				return Promise.reject( new SubmissionError({_error : message}));
			})
	);
};

export const logout = () => dispatch => {
	dispatch(clearToken());
	localStorage.clear();
};