import { REQUEST_EMPLOYEES, EMPLOYEES_SUCCESS, EMPLOYEES_ERROR } from '../actions/employee';

const initialState = {
	employees: [],
	loading: false,
	error: null
};

export default function employeesReducer(state = initialState, action) {
	if (action.type === REQUEST_EMPLOYEES) {
		return {
			...state,
			loading: true
		};
	}

	if (action.type === EMPLOYEES_SUCCESS) {
		return {
			...state,
			loading: true,
			employees: action.data,
			error: null
		};
	}

	if (action.type === EMPLOYEES_ERROR) {
		return {
			...state,
			loading: true,
			error: action.error
		};
	}
	return state;
}