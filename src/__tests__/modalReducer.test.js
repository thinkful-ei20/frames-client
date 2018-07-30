import modalReducer from '../reducers/modals';
import { showModal, hideModal } from '../actions/modals';


describe('Modal Reducer', () => {
	it('Should set the initial state when nothing is passed in', () => {
		const state = modalReducer(undefined, {type: '@@notathing!'});
		expect(state).toEqual({
			modalType: null,
			currentId : null
		});
	});

	it('Should return the current state with an unknown action', () => {
		const currentState = {};
		const state = modalReducer(currentState, {type: '@@notathing!'});
		expect(state).toBe(currentState);
	});

	it('Should return the correct state given showModal', () => {
		let state;
		const modalType = 'test modal type';
		const currentId = 'test id';
		state = modalReducer(state, showModal(modalType, currentId));
		expect(state).toEqual({
			modalType,
			currentId
		});
	});

	it('Should return the correct state given hideModal', () => {
		let state;
		state = modalReducer(state, hideModal());
		expect(state).toEqual({
			modalType:null,
			currentId: null
		});
	});

});