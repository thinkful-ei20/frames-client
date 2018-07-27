import { FILTER_SUCCESS } from '../actions/filter';

export const initialState = {
	employeeId: '',
	start: '',
	end: ''
};

export default (state = initialState, action) => {
	if (action.type === FILTER_SUCCESS) {
		return {
			employeeId: action.employeeId,
			start: action.start,
			end: action.end
		};
	}
	return state;
};

