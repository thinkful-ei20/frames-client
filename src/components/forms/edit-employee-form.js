import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {updateEmployee,deleteEmployee,clearEmployeeError} from '../../actions/employee';
import {hideModal} from '../../actions/modals';

import EmployeeAvailability from '../employeeAvailability';

export class EditEmployeeForm extends React.Component {
	handleSubmit(e){
		e.preventDefault();
		const data = new FormData(e.target);
		const availability = [];
		const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
		daysOfWeek.forEach(day => {
			if (data.get(day)){
				availability.push({
					day,
					start : data.get(`${day}-start`),
					end: data.get(`${day}-end`)
				});
			}
		});

		const updatedEmployee = {
			firstname : data.get('firstname'),
			lastname : data.get('lastname'),
			email : data.get('email'),
			phoneNumber : data.get('phoneNumber'),
			password : data.get('password'),
			availability
		};

		return this.props.dispatch(updateEmployee(this.props.id, updatedEmployee));
	}

	handleCancel() {
		return this.props.dispatch(hideModal());
	}

	handleDelete() {
		return this.props.dispatch(deleteEmployee(this.props.id));
	}

	render(){

		let error;
		if (this.props.error){
			error = (
				<div className="form-modal-error" aria-live="polite">
					{this.props.error.message}
				</div>
			);
		}

		return (
			<React.Fragment>
				<div className="modal-form-wrapper">
					<button
						className="modal-close-btn"
						title="Close edit employee form"
						onClick={() => this.handleCancel()}>
					</button>
					<div className="form-wrapper">
						<h2 className="form-header">Edit Employee</h2>
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
									<label htmlFor="img">Image
										<input
											type='text'
											id='img'
											name='img'
											defaultValue={this.props.employee.img ? this.props.employee.img : null}
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

								<div className="form-field">
									<EmployeeAvailability availability={this.props.employee.availability}/>
								</div>

								<div className="form-field">
									<label htmlFor="password">Password
										<input
											type='password'
											id='password'
											name='password'
											required
										/>
									</label>
								</div>
								<div className="form-field form-btns">
									<button className="form-delete-btn" title="Delete employee button" type='button' onClick={() => this.handleDelete()}>
										<i className="fa fa-trash-o" aria-hidden="true"></i>
									</button>
									<button onClick={() => this.props.dispatch(clearEmployeeError())} className="form-reset-btn" type="reset">Reset</button>
									<button
										className="form-submit-btn"
										title="Edit employee form submit button"
										type="submit"
										disabled={this.props.error}
									>Save</button>
								</div>
								{error}
							</fieldset>
						</form>
					</div>
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