import { filterSuccess } from '../actions/filter';

export const initialState = {
	filter: null
};

export default (state = initialState, action) => {
	if (action.type === filterSuccess) {
		return {
			...state,
			filter: action.filter
		};
	}
	return state;
};