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
				<h2>New Employee</h2>
				<div className="form-wrapper">
					<form onSubmit={e => this.handleSubmit(e)}>
						<div className="form-field">
							<label htmlFor="firstname">First Name</label>
							<input
								type='text'
								id='firstname'
								name='firstname'
							/>
						</div>
						<div className="form-field">
							<label htmlFor="lastname">Last Name</label>
							<input
								type='text'
								id='lasttname'
								name='lastname'
							/>
						</div>
						<div className="form-field">
							<label htmlFor="image">Link to Image of Employee</label>
							<input
								type='text'
								id='image'
								name='image'
							/>
						</div>
						<div className="form-field">
							<label htmlFor="email">Email Address</label>
							<input
								type='email'
								id='email'
								name='email'
							/>
						</div>
						<div className="form-field">
							<label htmlFor="phoneNumber">Phone Number</label>
							<input
								type='tel'
								id='phoneNumber'
								name='phoneNumber'
							/>
						</div>
						<div className="form-field">
							<label htmlFor="password">Password</label>
							<input
								type='password'
								id='password'
								name='password'
							/>
						</div>
						<button className="form-submit-btn" type='submit'>Save</button>
					</form>
				</div>
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