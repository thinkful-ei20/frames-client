import { API_BASE_URL } from '../config';
// import { normalizeResponseErrors } from './utils';

export const REQUEST_EMPLOYEES = 'REQUEST_EMPLOYEES';
export const requestEmployees = () => {
	return {
		type : REQUEST_EMPLOYEES
	};
};

export const EMPLOYEES_SUCCESS = 'EMPLOYEES_SUCCESS';
export const employeesSuccess = data => {
	return {
		type: EMPLOYEES_SUCCESS,
		data
	};
};

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
  // .then(res => res.normalizeResponseErrors())
	.then(res => res.json())
	.then(data => dispatch(employeesSuccess(data)))
	.catch(error => dispatch(employeesError(error.message)));
};
