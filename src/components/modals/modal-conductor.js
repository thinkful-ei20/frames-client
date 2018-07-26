import React from 'react';
import ReactModal from 'react-modal';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import EditShiftForm from '../forms/edit-shift-form';

import {hideModal} from '../../actions/modals';
import EditEmployeeForm from '../forms/edit-employee-form';
import AddEmployeeForm from '../forms/create-employee-form';

import './styles/modal.css';
import CreateShiftForm from '../forms/create-shift-form';

export function ModalConductor(props) {
	let contentLabel;
	let content;

	if (props.modalType === 'edit') {
		contentLabel = 'Edit a Shift';
		content = <EditShiftForm/>;
	} else if (props.modalType === 'employee') {
		contentLabel = 'Edit an Employee';
		content = <EditEmployeeForm/>;
	} else if (props.modalType === 'newEmployee') {
		contentLabel= 'Create an Employee';
		content = <AddEmployeeForm />;
	} else if (props.modalType === 'newShift') {
		contentLabel = 'Create a Shift';
		content = <CreateShiftForm />;
	}


	return (<ReactModal
		isOpen={props.modalType !== null}
		onRequestClose={() => {props.dispatch(hideModal());}}
		contentLabel={contentLabel}
		shouldFocusAfterRender={true}
		shouldCloseOnOverlayClick={false}
		appElement={document.getElementById('root')}
		overlayClassName="modal-overlay"
		className="modal-content"
	>
		{content}
	</ReactModal>);
}

const mapStateToProps = state => {
	return {
		modalType : state.modal.modalType
	};
};

ModalConductor.propTypes = {
	modalType: PropTypes.string,
	dispatch: PropTypes.func
};

export default connect(mapStateToProps)(ModalConductor);