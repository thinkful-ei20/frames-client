import filterReducer from '../reducers/filter';
import { filterSuccess } from '../actions/filter';

describe('Filter Reducer', () => {
	it('Should set the initial state when nothing is passed in', () => {
		const state = filterReducer(undefined, {type: '@@notathing!'});
		expect(state).toEqual({
			employeeId: '',
			start: '',
			end: ''
		});
	});

	it('Should return the current state with an unknown action', () => {
		const currentState = {};
		const state = filterReducer(currentState, {type: '@@notathing!'});
		expect(state).toBe(currentState);
	});

	it('Should return the correct state given filterSuccess', () => {
		let state;
		const employeeId = 'test id';
		const	start = 'test start';
		const	end = 'test end';

		state = filterReducer(state, filterSuccess(employeeId, start, end));
		expect(state).toEqual({
			employeeId,
			start,
			end
		});
	});

});