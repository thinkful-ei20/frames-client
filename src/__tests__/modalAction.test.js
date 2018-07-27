import { showModal, SHOW_MODAL, hideModal, HIDE_MODAL } from '../actions/modals';

describe('Modal actions', () => {
	describe('show modal', () => {
		it('should return the correct object', () => {
			const modalType = 'test type';
			const currentId = 'test id';
			const action = showModal(modalType, currentId);
			expect(action.type).toEqual(SHOW_MODAL);
			expect(action.modalType).toEqual(modalType);
			expect(action.currentId).toEqual(currentId);
		});
	});

	describe('hide modal', () => {
		it('should return the correct object', () => {
			const action = hideModal();
			expect(action.type).toEqual(HIDE_MODAL);
		});
	});
});