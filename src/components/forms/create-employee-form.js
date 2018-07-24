import React from 'react';
import {connect} from 'react-redux';
import { createEmployee } from '../../actions/employee';
import PropTypes from 'prop-types';
import { hideModal } from '../../actions/modals';

class AddEmployeeForm extends React.Component {
	handleSubmit(e){
		e.preventDefault();
		const data = new FormData(e.target);
		const newEmployee = {
			firstname : data.get('firstname'),
			lastname : data.get('lastname'),
			email : data.get('email'),
			phoneNumber : data.get('phoneNumber'),
			img : data.get('image'),
			password : data.get('password')
		};
		this.props.dispatch(createEmployee(newEmployee));
	}

	handleCancel() {
		this.props.dispatch(hideModal());
	}

	render(){
		return (
			<React.Fragment>
				<h2>Edit an Employee</h2>
				<form onSubmit={e => this.handleSubmit(e)}>
					<fieldset>
						<legend>
              Personal Details
						</legend>
						<label htmlFor="firstname">First Name</label>
						<input
							type='text'
							id='firstname'
							name='firstname'
						/>

						<label htmlFor="lastname">Last Name</label>
						<input
							type='text'
							id='lasttname'
							name='lastname'
						/>

						<label htmlFor="image">Link to Image of Employee</label>
						<input
							type='text'
							id='image'
							name='image'
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
						/>
						<label htmlFor="phoneNumber">Phone Number</label>
						<input
							type='tel'
							id='phoneNumber'
							name='phoneNumber'
						/>
					</fieldset>

					<fieldset>
						<legend>
              Login details
						</legend>
						<label htmlFor="password">Password</label>
						<input
							type='text'
							id='password'
							name='password'
						/>
					</fieldset>
					<button type='submit'>Create Employee</button>
				</form>
				<button onClick={() => this.handleCancel()}>Cancel</button>
			</React.Fragment>
		);
	}
}


AddEmployeeForm.propTypes = {
	dispatch : PropTypes.func,
	id : PropTypes.string,
	employee : PropTypes.object
};

export default connect()(AddEmployeeForm);