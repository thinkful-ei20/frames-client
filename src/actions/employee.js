import { API_BASE_URL } from '../config';

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
		.then(res => res.json())
		.then(data => dispatch(employeesSuccess(data)))
		.catch(error => dispatch(employeesError(error.message)));
};
