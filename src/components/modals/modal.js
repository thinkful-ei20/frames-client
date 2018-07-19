import React from 'react';
import PropTypes from 'prop-types';

import './styles/modal.css';


/* 	The idea is to pass in props based on the modal we want, as this will
 * 	be a wrapper component for our admin-form modals i.e editing a shift
 * 	or something, or even our employee modals...
 *
 *  This technique is discussed here:
 *	https://codeburst.io/modals-in-react-f6c3ff9f4701
 *
 */

export const Modal = (props) => {

	/** Handles the out of bounds modal click */
	const handleBackgroundClick = (e) => {
		if(e.target === e.currentTarget) props.hideModal();
	};

	/** If the modal is given the 'OK' i.e submitted, finished, completed ect...  */
	const onOk = () => {
		props.onOk();
		props.hideModal();
	};

	const okButton = props.showOk
		? (<button onClick={onOk} disabled={props.okDisabled}>{props.okText}</button>)
		: null;

	return (
		<div className="modal-overlay" onClick={handleBackgroundClick}>
			<div className="modal-content">
				<h3>{props.title}</h3>
				<button onClick={props.hideModal}>Close</button>
			</div>
			{/*Some DOM for our specific modal */}
			{props.children}
			{okButton}
		</div>
	);
};

Modal.propTypes = {

	title: PropTypes.string,
	okText: PropTypes.string,

	okDisabled: PropTypes.bool, /* <--- to disable 'OK' button */
	showOk: PropTypes.bool, 	/* <--- to hide 'OK' button */

	children: PropTypes.oneOfType([
		PropTypes.array,
		PropTypes.element,
		PropTypes.string,
	]).isRequired,

	//methods we pass down for our specific modal component

	hideModal: PropTypes.func,	/* <--- this is the passdown action generator */
	onOk: PropTypes.func		/* <--- this is a method we call once a particular modal is given the 'OK' */
};

// Things we need to make the modal work...
Modal.defaultProps = {
	title: '',
	okText: 'OK',
	showOk: true,
	okDisabled: false,
	onOk: () => {}
};

export default Modal;