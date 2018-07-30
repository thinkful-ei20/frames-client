import employeesReducer from '../reducers/employees';
import { requestEmployees, employeesSuccess, employeesError } from '../actions/employee';

describe('Employees Reducer', () => {
	it('Should set the initial state when nothing is passed in', () => {
		const state = employeesReducer(undefined, {type: '@@notathing!'});
		expect(state).toEqual({
			employees: [],
			loading: false,
			error: null
		});
	});

	it('Should return the current state with an unknown action', () => {
		const currentState = {};
		const state = employeesReducer(currentState, {type: '@@notathing!'});
		expect(state).toBe(currentState);
	});

	it('Should return the correct state given requestEmployees', () => {
		let state;
		state = employeesReducer(state, requestEmployees());
		expect(state).toEqual({
			employees: [],
			loading: true,
			error: null
		});
	});
  
	it('Should return the correct state given employeesSuccess', ()=>{
		let state;
		let employees = 'test data';
		state = employeesReducer(state, employeesSuccess(employees));
		expect(state).toEqual({
			employees,
			loading: false,
			error: null
		});
	});

	it('Should return the correct state given profileError', () =>{
		let state;
		let error = 'test error';
		state = employeesReducer(state, employeesError(error));
		expect(state).toEqual({
			employees: [],
			loading: false,
			error
		});
	});
});