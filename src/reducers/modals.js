import { SHOW_MODAL, HIDE_MODAL } from '../actions/modals';

const initialState = {
	modalType: null
};

export default function (state=initialState, action) {

	switch(action.type) {
	case SHOW_MODAL:
		state = Object.assign({}, state,
			{
				modalType: action.modalType
			} );
		break;
	case HIDE_MODAL:
		state = Object.assign({}, state,
			{
				modalType: null
			} );
		break;
	default:
		return state;
	}
	return state;
}