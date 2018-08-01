import {REQUEST_FRAMES,FRAMES_SUCCESS,FRAMES_ERROR,SET_FRAMES_VIEW, CLEAR_FRAME_ERROR} from '../actions/frames';

const initialState = {
	frames: [],
	loading: false,
	error: null,
	view: 'weekly'
};


export default function framesReducer(state = initialState, action){
	if (action.type === (REQUEST_FRAMES)){
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

	if (action.type === SET_FRAMES_VIEW){
		return {
			...state,
			view : action.view
		};
	}

	if(action.type === CLEAR_FRAME_ERROR) {
		return {
			...state,
			error: null
		};
	}

	return state;
}