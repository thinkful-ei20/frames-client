import profileReducer from '../reducers/profile';
import { requestProfile, profileSuccess, profileError } from '../actions/profile';

describe('Profile Reducer', () => {
	it('Should set the initial state when nothing is passed in', () => {
		const state = profileReducer(undefined, {type: '@@notathing!'});
		expect(state).toEqual({
			data: {},
			loading: false,
			error: null
		});
	});

	it('Should return the current state with an unknown action', () => {
		const currentState = {};
		const state = profileReducer(currentState, {type: '@@notathing!'});
		expect(state).toBe(currentState);
	});

	it('Should return the correct state given requestProfile', () => {
		let state;
		state = profileReducer(state, requestProfile());
		expect(state).toEqual({
			data: {},
			loading: true,
			error: null
		});
	});
  
	it('Should return the correct state given profileSuccess', ()=>{
		let state;
		let data = 'test data';
		state = profileReducer(state, profileSuccess(data));
		expect(state).toEqual({
			data,
			loading: false,
			error: null
		})
	});

	it('Should return the correct state given profileError', () =>{
		let state;
		let error = 'test error';
		state = profileReducer(state, profileError(error));
		expect(state).toEqual({
			data: {},
			loading: false,
			error
		});
	});
});