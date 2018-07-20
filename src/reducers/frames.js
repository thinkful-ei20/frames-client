import { REQUEST_FRAMES, FRAMES_SUCCESS, FRAMES_ERROR } from '../actions/frames';
import { REASSIGN_SHIFT, REASSIGN_SUCCESS, REASSIGN_ERROR } from '../actions/reassignShift';

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

	// ======================================================
	if (action.type === REASSIGN_SHIFT) {
		return {
			...state,
			loading: true
		};
	}

	if (action.type === REASSIGN_SUCCESS) {
		return {
			...state,
			loading: false,
			frames : action.data,
			error: null
		};
	}

	if (action.type === REASSIGN_ERROR) {
		return {
			...state,
			loading: false,
			error: action.error
		};
	}
	return state;
}