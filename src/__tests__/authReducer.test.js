import authReducer from '../reducers/auth';
import { setToken, requestLogin, clearToken, loginError, loginSuccess } from '../actions/auth';

describe('Auth Reducer', () => {
	it('Should set the initial state when nothing is passed in', () => {
		const state = authReducer(undefined, {type: '@@notathing!'});
		expect(state).toEqual({
			user: null,
			loading: false,
			error: null
		});
	});

	it('Should return the current state with an unknown action', () => {
		const currentState = {};
		const state = authReducer(currentState, {type: '@@notathing!'});
		expect(state).toBe(currentState);
	});


	it ('Should return the correct state given clearToken', () => {
		let state;
		state = authReducer(state, clearToken());
		expect(state).toEqual({
			user: null,
			loading: false,
			error: null
		});
	});

	it ('Should return the correct state given requestLogin', () => {
		let state;
		state = authReducer(state, requestLogin());
		expect(state).toEqual({
			user: null,
			loading: true,
			error: null
		});
	});

	it ('Should return the correct state given loginError', () => {
		let state;
		let error = 'test error';
		state = authReducer(state, loginError(error));
		expect(state).toEqual({
			user: null,
			loading: false,
			error
		});
	});

	it ('Should return the correct state given login success', () => {
		let state;
		let user = 'test user';
		state = authReducer(state, loginSuccess(user));
		expect(state).toEqual({
			user,
			loading: false,
			error: null
		});
	});
});
