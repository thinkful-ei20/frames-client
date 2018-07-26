import { SET_TOKEN, setToken, clearToken, CLEAR_TOKEN, requestLogin, REQUEST_LOGIN, loginError, LOGIN_ERROR } from '../actions/auth';

describe('Set Auth Token Action', () => {
	it('should return the correct action', () => {
		const token = 'test token';
		const action = setToken(token);
		expect(action.type).toEqual(SET_TOKEN);
		expect(action.token).toEqual(token);
	});
});

describe('Clear Token Action', () => {
	it('should return the correct action', () => {
		const action = clearToken();
		expect(action.type).toEqual(CLEAR_TOKEN);
	});
});

describe('Request Login Action', () => {
	it('Should return the correct action', () => {
		const action = requestLogin();
		expect(action.type).toEqual(REQUEST_LOGIN);
	});
});

describe('Login Error Action', () => {
	it('Should return the corect action', () => {
		const error = 'test error';
		const action = loginError(error);
		expect(action.type).toEqual(LOGIN_ERROR);
		expect(action.error).toEqual(error);
	});
});

describe('Login Asynch Action', () => {
	//To-do
});