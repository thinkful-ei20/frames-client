import { REQUEST_FRAMES, FRAMES_SUCCESS, FRAMES_ERROR } from '../actions/frames';

const initialState = {
	frames: [],
	loading: false,
	error: null
};

export default function framesReducer(state = initialState, action) {
	if (action.type === REQUEST_FRAMES){
		return {
			...state,
			loading: true
		};
	}

	if (action.type === FRAMES_SUCCESS){
		return {
			...state,
			loading: false,
			frames : action.data,
			error: null
		};
	}

	if (action.type === FRAMES_ERROR){
		return {
			...state,
			loading: false,
			error: action.error
		};
	}

	return state;
}