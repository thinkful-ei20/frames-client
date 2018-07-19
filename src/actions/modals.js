export const HIDE_MODAL = 'HIDE_MODAL';

export const SHOW_MODAL = 'SHOW_MODAL';

export const showModal = (modalType, currentId) => ({
	type: SHOW_MODAL,
	modalType,
	currentId
});

export const hideModal = () => ({
	type: HIDE_MODAL
});