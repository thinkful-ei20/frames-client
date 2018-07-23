import React from 'react';
import {connect} from 'react-redux';
import { updateEmployee } from '../../actions/employee';
import PropTypes from 'prop-types';

class EditEmployeeForm extends React.Component {
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

	render(){
		return (
			<React.Fragment>
				<h2>Edit an Employee</h2>
				<form onSubmit={e => this.handleSubmit(e)}>
					<fieldset>
						<legend>
              Full Name
						</legend>
						<label htmlFor="firstname">First Name</label>
						<input
							type='text'
							id='firstname'
							name='firstname'
							defaultValue={this.props.employee.firstname}
						/>

						<label htmlFor="lastname">Last Name</label>
						<input
							type='text'
							id='lasttname'
							name='lastname'
							defaultValue={this.props.employee.lastname}
						/>
					</fieldset>

					<fieldset>
						<legend>
              Contact Details
						</legend>
						<label htmlFor="email">Email Address</label>
						<input
							type='email'
							id='email'
							name='email'
							defaultValue={this.props.employee.email}
						/>
						<label htmlFor="phoneNumber">Phone Number</label>
						<input
							type='tel'
							id='phoneNumber'
							name='phoneNumber'
							defaultValue={this.props.employee.phoneNumber}
						/>
					</fieldset>
					<button type='submit'>Update Employee</button>
				</form>
				<button>Delete</button>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => {
	const id = state.modal.currentId;
	const currentEmployee = state.employees.employees.filter(employee => employee.id === id)[0];
	return {
		employee : currentEmployee,
		id
	};
};

EditEmployeeForm.propTypes = {
	dispatch : PropTypes.func,
	id : PropTypes.string,
	employee : PropTypes.object
};

export default connect(mapStateToProps)(EditEmployeeForm);