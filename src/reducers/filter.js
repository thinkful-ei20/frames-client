import { FILTER_SUCCESS, ADVANCED_FILTER_SUCCESS, SET_START_VALUE, SET_END_VALUE, SET_DAY_VALUE } from '../actions/filter';

export const initialState = {
	filter: null,
	start: null,
	end: null,
	day: null
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

	if (action.type === SET_DAY_VALUE) {
		return {
			...state,
			day: action.day
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

