import { REQUEST_FRAMES, FRAMES_SUCCESS, FRAMES_ERROR } from '../actions/frames';
import { REQUEST_EDIT_FRAME, EDIT_FRAME_ERROR } from '../actions/edit-frame';

const initialState = {
	frames: [],
	loading: false,
	error: null
};


export default function framesReducer(state = initialState, action) {
	if (action.type === (REQUEST_FRAMES || REQUEST_EDIT_FRAME)){
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

	if (action.type === EDIT_FRAME_ERROR){
		console.log('In The Reducer',action.error);
		return {
			...state,
			loading: false,
			error: action.error
		};
	}

	return state;
}