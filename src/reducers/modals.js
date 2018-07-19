import { SHOW_MODAL, HIDE_MODAL } from '../actions/modals';

const initialState = {
	modalType: null,
	currentId : null
};

export default function (state=initialState, action) {

	switch(action.type) {
	case SHOW_MODAL:
		state = Object.assign({}, state,
			{
				modalType: action.modalType,
				currentId : action.currentId
			} );
		break;
	case HIDE_MODAL:
		state = Object.assign({}, state,
			{
				modalType: null,
				currentId: null
			} );
		break;
	default:
		return state;
	}
	return state;
}