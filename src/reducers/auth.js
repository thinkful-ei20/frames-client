import { SET_TOKEN, CLEAR_TOKEN, REQUEST_LOGIN, LOGIN_SUCCESS, LOGIN_ERROR } from '../actions/auth';

const initialState = {
	authToken: null,
	user: null,
	loading: false,
	error: null
};

export default function authReducer(state = initialState, action) {
	if (action.type === SET_TOKEN){
		return {
			...state,
			authToken : action.token
		};
	}

	if (action.type === REQUEST_LOGIN){
		return {
			...state,
			loading: true,
			error: null
		};
	}
	if (action.type === LOGIN_SUCCESS){
		return {
			...state,
			loading: false,
			error: null,
			user: action.user
		};
	}
	if (action.type === LOGIN_ERROR){
		console.log('Login error reducer ran', action.error);
		return {
			...state,
			error: action.error,
			loading: false
		};
	}

	return state;
}