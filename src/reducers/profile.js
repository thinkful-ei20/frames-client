import { REQUEST_PROFILE, PROFILE_SUCCESS, PROFILE_ERROR } from '../actions/profile';

const initialState = {
	data : {},
	loading: false,
	error: null
};

export default function profileReducer(state = initialState, action){
	if (action.type === REQUEST_PROFILE){
		return {
			...state,
			loading: true
		};
	}

	if (action.type === PROFILE_SUCCESS){
		return {
			...state,
			loading: false,
			data : action.data
		};
	}

	if (action.type === PROFILE_ERROR){
		return {
			...state,
			loading: false,
			error: action.error
		};
	}

	return state;
}