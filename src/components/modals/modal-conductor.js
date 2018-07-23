import React from 'react';
import ReactModal from 'react-modal';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import EditShiftForm from '../forms/edit-shift-form';

import {hideModal} from '../../actions/modals';
import EditEmployeeForm from '../forms/edit-employee-form';

export function ModalConductor(props) {
	let contentLabel;
	let content;

	if (props.modalType === 'edit') {

		contentLabel = 'Edit a Shift';
		content = <EditShiftForm/>;
	} else if (props.modalType === 'employee'){
		contentLabel = 'Edit an Employee';
		content = <EditEmployeeForm/>;
	}

	return (<ReactModal
		isOpen={props.modalType !== null}
		onRequestClose={() => {props.dispatch(hideModal());}}
		contentLabel={contentLabel}
		shouldFocusAfterRender={true}
		shouldCloseOnOverlayClick={false}
		appElement={document.getElementById('root')}
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