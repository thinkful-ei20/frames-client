import React from 'react';
import ReactModal from 'react-modal';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import EditEmployeeForm from '../forms/edit-employee-form';
import CreateEmployeeForm from '../forms/create-employee-form';
import CreateFrameForm from '../forms/create-frame-form';
import EditFrameForm from '../forms/edit-frame-form';
import SuperFilter from '../forms/super-filter';
import {hideModal} from '../../actions/modals';

import './styles/modal.css';

export function ModalConductor(props) {
	let contentLabel;
	let content;

	if (props.modalType === 'edit') {
		contentLabel = 'Edit a Frame';
		content = <EditFrameForm/>;
	} else if (props.modalType === 'employee') {
		contentLabel = 'Edit an Employee';
		content = <EditEmployeeForm/>;
	} else if (props.modalType === 'newEmployee') {
		contentLabel= 'Create an Employee';
		content = <CreateEmployeeForm />;
	} else if (props.modalType === 'newFrame') {
		contentLabel = 'Create a Frame';
		content = <CreateFrameForm />;
	} else if (props.modalType === 'superFilter') {
		contentLabel='Filter';
		content = <SuperFilter/>;
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