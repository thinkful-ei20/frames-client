import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {createEmployee} from '../../actions/employee';
import {hideModal} from '../../actions/modals';

export class CreateEmployeeForm extends React.Component {
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
		let error;

		if(this.props.error) {
			error = (
				<div className="form-modal-error" aria-live="polite">
					{this.props.error}
				</div>
			);
		}

		return (
			<React.Fragment>
				<button
					className="modal-close-btn"
					title="Close create employee form"
					type="button"
					onClick={() => this.handleCancel()}>
				</button>
				<div className="modal-form-wrapper">
					<div className="form-wrapper">
						<h2 className='form-header'>New Employee</h2>
						<form onSubmit={e => this.handleSubmit(e)}>
							<fieldset>
								<legend>Add Employee</legend>
								<div className="form-field">
									<label htmlFor="firstname">First Name
										<input
											type='text'
											id='firstname'
											name='firstname'
										/>
									</label>
								</div>
								<div className="form-field">
									<label htmlFor="lastname">Last Name
										<input
											type='text'
											id='lastname'
											name='lastname'
										/>
									</label>
								</div>
								<div className="form-field">
									<label htmlFor="image">Image URL
										<input
											type='text'
											id='image'
											name='image'
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
										/>
									</label>
								</div>
								<div className="form-field">
									<label htmlFor="phoneNumber">Phone Number
										<input
											type='tel'
											id='phoneNumber'
											name='phoneNumber'
											pattern='[0-9]{3}[0-9]{3}[0-9]{4}'
											required
										/>
									</label>
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
									<button className="form-reset-btn" type="button" onClick={() => this.handleCancel()}>Cancel</button>
									<button className="form-submit-btn" type='submit'>Save</button>
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


CreateEmployeeForm.propTypes = {
	dispatch : PropTypes.func,
	id : PropTypes.string,
	employee : PropTypes.object
};

const mapStateToProps = state => {
	return {
		error: state.employees.error
	};
};

export default connect(mapStateToProps)(CreateEmployeeForm);