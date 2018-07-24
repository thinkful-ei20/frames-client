import { FILTER_SUCCESS } from '../actions/filter';

export const initialState = {
	filter: null
};

export default (state = initialState, action) => {
	if (action.type === FILTER_SUCCESS) {
		return {
			...state,
			filter: action.filter
		};
	}
	return state;
};

