import React from 'react';
import {connect} from 'react-redux';
import { createEmployee } from '../../actions/employee';
import PropTypes from 'prop-types';
import { hideModal } from '../../actions/modals';

export class AddEmployeeForm extends React.Component {
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
        <button className="modal-close-btn" onClick={() => this.handleCancel()}></button>
				<div className="modal-form-wrapper">
					<div className="form-wrapper">
          <h2 className='form-header'>New Employee</h2>
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
						<div className="form-field form-btns">
							<button className="form-reset-btn" type="reset" onClick={() => this.handleCancel()}>Cancel</button>
              <button className="form-submit-btn" type='submit'>Save</button>
						</div>
            {error}
					</form>
				</div>
        </div>
			</React.Fragment>
		);
	}
}


AddEmployeeForm.propTypes = {
	dispatch : PropTypes.func,
	id : PropTypes.string,
	employee : PropTypes.object
};

const mapStateToProps = state => {
	return {
		error: state.employees.error
	}
};

export default connect(mapStateToProps)(AddEmployeeForm);