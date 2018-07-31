import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {updateEmployee,deleteEmployee} from '../../actions/employee';
import {hideModal} from '../../actions/modals';

export class EditEmployeeForm extends React.Component {
	handleSubmit(e){
		e.preventDefault();
		const data = new FormData(e.target);
		const updatedEmployee = {
			firstname : data.get('firstname'),
			lastname : data.get('lastname'),
			email : data.get('email'),
			phoneNumber : data.get('phoneNumber')
		};
		this.props.dispatch(updateEmployee(this.props.id, updatedEmployee));
	}

	handleCancel() {
		this.props.dispatch(hideModal());
	}

	handleDelete() {
		this.props.dispatch(deleteEmployee(this.props.id));
	}

	render(){

		let formError;
		if (this.props.error){
			formError = this.props.error.message;
		}

		return (
			<React.Fragment>
				<h2 className="form-header">Edit Employee</h2>
				<button className="modal-close-btn" onClick={() => this.handleCancel()}></button>
				<div className="form-wrapper">
					<form onSubmit={e => this.handleSubmit(e)}>
						<fieldset>
							<legend>Edit Employee</legend>
							<div className="form-field">
								<label htmlFor="firstname">First Name
									<input
										type='text'
										id='firstname'
										name='firstname'
										defaultValue={this.props.employee.firstname}
									/>
								</label>
							</div>
							<div className="form-field">
								<label htmlFor="lastname">Last Name
									<input
										type='text'
										id='lasttname'
										name='lastname'
										defaultValue={this.props.employee.lastname}
									/>
								</label>
							</div>
							<div className="form-field">
								<label htmlFor="email">Email Address
									<input
										type='email'
										id='email'
										name='email'
										required
										defaultValue={this.props.employee.email}
									/>
								</label>
							</div>
							<div className="form-field">
								<label htmlFor="phoneNumber">Phone Number
									<input
										type='tel'
										id='phoneNumber'
										name='phoneNumber'
										required
										defaultValue={this.props.employee.phoneNumber}
										pattern='[0-9]{3}[0-9]{3}[0-9]{4}'
									/>
								</label>
							</div>
						</fieldset>
						<input className="form-reset-btn" type="reset"/>
						<div className="form-btns">
							<button className="form-submit-btn" title="Edit employee form submit button" type='submit'>Save</button>
							<button className="form-delete-btn" title="Delete employee button" onClick={() => this.handleDelete()}>
								<i className="fa fa-trash-o" aria-hidden="true"></i>
							</button>
						</div>
						<p className="form-error">{formError}</p>
					</form>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	const id = state.modal.currentId;
	const currentEmployee = state.employees.employees.filter(employee => employee.id === id)[0];
	return {
		employee : currentEmployee,
		id,
		error : state.employees.error
	};
};

EditEmployeeForm.propTypes = {
	dispatch : PropTypes.func,
	id : PropTypes.string,
	employee : PropTypes.object,
	error : PropTypes.object
};

export default connect(mapStateToProps)(EditEmployeeForm);