import {REQUEST_FRAMES,FRAMES_SUCCESS,FRAMES_ERROR,SET_FRAMES_VIEW} from '../actions/frames';
import {REQUEST_EDIT_FRAME, EDIT_FRAME_ERROR} from '../actions/edit-frame';

const initialState = {
	frames: [],
	loading: false,
	error: null,
	view: 'weekly'
};


export default function framesReducer(state = initialState, action){
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
		return {
			...state,
			loading: false,
			error: action.error
		};
	}

	if (action.type === SET_FRAMES_VIEW){
		return {
			...state,
			view : action.view
		};
	}

	return state;
}