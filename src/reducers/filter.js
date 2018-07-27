import { FILTER_SUCCESS, RESET_FILTER_STATE } from '../actions/filter';

export const initialState = {
	employeeId: '',
	start: '',
	end: ''
};

export default (state = initialState, action) => {
	if (action.type === RESET_FILTER_STATE) {
		return initialState;
	}

	if (action.type === FILTER_SUCCESS) {
		return {
			employeeId: action.employeeId,
			start: action.start,
			end: action.end
		};
	}
	return state;
};

