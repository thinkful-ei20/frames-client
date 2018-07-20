
// Set modalType to either 'editing' or 'reassing' and load up the id of the frame in question
export const SHOW_MODAL = 'SHOW_MODAL';
export const showModal = (modalType, currentId) => ({
	type: SHOW_MODAL,
	modalType,
	currentId
});

// Set modalType and Id to null
export const HIDE_MODAL = 'HIDE_MODAL';
export const hideModal = () => ({
	type: HIDE_MODAL
});