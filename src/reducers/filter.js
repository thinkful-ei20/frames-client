import { FILTER_SUCCESS, ADVANCED_FILTER_SUCCESS, SET_START_VALUE, SET_END_VALUE } from '../actions/filter';

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

	if (action.type === SET_START_VALUE) {
		return {
			...state,
			start: action.start
		};
	}

	if (action.type === SET_END_VALUE) {
		return {
			...state,
			end: action.end
		};
	}
	
	if (action.type === ADVANCED_FILTER_SUCCESS) {
		return {
			...state,
			filter: action.filter
		};
	}
	return state;
};

