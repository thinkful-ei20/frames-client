import { requestEmployees, REQUEST_EMPLOYEES, employeesSuccess, EMPLOYEES_SUCCESS, employeesError, EMPLOYEES_ERROR } from '../actions/employee';

describe('Employee Actions', () => {
	describe('REQUEST_EMPLOYEES', () => {
		it('should return the correct object', () => {
			const action = requestEmployees();
			expect(action.type).toEqual(REQUEST_EMPLOYEES);
		});
	});

	describe('EMPLOYEES_SUCCESS', () => {
		it('should return the correct object', () => {
			const data = 'test data';
			const action = employeesSuccess(data);
			expect(action.type).toEqual(EMPLOYEES_SUCCESS);
		});
	});

	describe('EMPLOYEES_ERROR', () => {
		it('should return the correct object', () => {
			const error = 'test error';
			const action = employeesError(error);
			expect(action.type).toEqual(EMPLOYEES_ERROR);
			expect(action.error).toEqual(error);
		});
	});
});