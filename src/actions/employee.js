import {API_BASE_URL} from '../config';
import {hideModal} from './modals';
import {normalizeResponseErrors} from './utils';

// Set loading to true
export const REQUEST_EMPLOYEES = 'REQUEST_EMPLOYEES';
export const requestEmployees = () => {
	return {
		type : REQUEST_EMPLOYEES
	};
};

// Set loading to false and add array of employees
export const EMPLOYEES_SUCCESS = 'EMPLOYEES_SUCCESS';
export const employeesSuccess = data => {
	console.log(data);
	return {
		type: EMPLOYEES_SUCCESS,
		data
	};
};

//Set loading to false and add error.message
export const EMPLOYEES_ERROR = 'EMPLOYEES_ERROR';
export const employeesError = error => {
	return {
		type: EMPLOYEES_ERROR,
		error
	};
};

export const CLEAR_EMPLOYEE_ERROR = 'CLEAR_EMPLOYEE_ERROR';
export const clearEmployeeError = () => {
	return {
		type: CLEAR_EMPLOYEE_ERROR
	};
};

// Asynch action to fetch all employees from server
export const fetchEmployees = () => dispatch => {
	const token = localStorage.getItem('authToken');
	dispatch(requestEmployees());
	return fetch(`${API_BASE_URL}/employee`, {
		method : 'GET',
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : `Bearer ${token}`
		}
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(data => dispatch(employeesSuccess(data)))
		.catch(error => {
			dispatch(employeesError(error.message));
		});
};

// Asynch action to update an employee
export const updateEmployee = (employeeId, updatedEmployee) => dispatch => {
	dispatch(requestEmployees());
	const token = localStorage.getItem('authToken');
	return fetch(`${API_BASE_URL}/employee/${employeeId}`, {
		method : 'PUT',
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : `Bearer ${token}`
		},
		body: JSON.stringify(updatedEmployee)
	})
		.then(res => normalizeResponseErrors(res))
		.then(() => {
			dispatch(fetchEmployees());
			dispatch(hideModal());
		})
		.catch(error => {
			dispatch(employeesError(error.message));
		});
};

//Asynch action to create an employee
export const createEmployee = newEmployee => dispatch => {
	dispatch(requestEmployees());
	const token = localStorage.getItem('authToken');
	return fetch(`${API_BASE_URL}/employee`, {
		method : 'POST',
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : `Bearer ${token}`
		},
		body : JSON.stringify(newEmployee)
	})
		.then(res => normalizeResponseErrors(res))
		.then(() => {
			dispatch(fetchEmployees());
			dispatch(hideModal());
		})
		.catch(error => dispatch(employeesError(error.message)));
};


//Asynch action to delete an employee
export const deleteEmployee = employeeId => dispatch => {
	dispatch(requestEmployees());
	const token = localStorage.getItem('authToken');
	return fetch(`${API_BASE_URL}/employee/${employeeId}`, {
		method : 'DELETE',
		headers : {
			'Content-Type' : 'application/json',
			'Authorization' : `Bearer ${token}`
		}
	})
		.then(() => {
			dispatch(fetchEmployees());
			dispatch(hideModal());
		})
		.catch(error => dispatch(employeesError(error.message)));
};