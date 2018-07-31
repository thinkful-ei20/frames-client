import React from 'react';
import {connect} from 'react-redux';
import {Field,reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import renderField from './field';
import {editProfile} from '../../actions/profile';
import {isTrimmed, length, nonEmpty, required, validEmail, validPhone} from './formValidators';

const passwordLength = length({ min: 8, max: 72 });

export class ProfileForm extends React.Component {

	constructor() {
		super();
		this.state = {
			error: null
		}
	}

	onSubmit = values => {
		const updatedProfile = {};
		Object.keys(values).forEach(key => {
			//Check to see if the user made a change, and only pass back key/values that are submitted
			if (values[key]) {
				updatedProfile[key] = values[key];
			}
		});
		console.log('UPDATED PROFILE', updatedProfile);
		this.props.dispatch(editProfile(this.props.initialValues.adminId, updatedProfile))
		/* work around for messy state logic with redux-forms, definitely should make it more succinct */
			.then( res => {
				if( res ) {
					this.setState({error: res.error});
				} else {
					this.setState({error: null});
					this.props.setEdit();
				}
			});
	};

	render() {
		let {error} = this.state;
		if (error) {
			error = (
				<div className="form-error" aria-live="polite">
					{this.state.error}
				</div>
			);
		}
		return (
      <div className="form-wrapper">
				<form
					onSubmit={this.props.handleSubmit(this.onSubmit)}
				>	
					{error}
					<label>Company name
						<Field
							name="companyName"
							type="text"
							component={renderField}
							validate={[required, nonEmpty, isTrimmed]}
						/>
					</label>

					<label>Username
						<Field
							name="username"
							type="text"
							component={renderField}
							validate={[required, nonEmpty, isTrimmed]}
						/>
					</label>

					<label>Email Address
						<Field
							name="email"
							type="text"
							component={renderField}
							validate={[required, validEmail]}
						/>
					</label>

					<label>Phone Number
						<Field
							name="phoneNumber"
							type="tel"
							component={renderField}
							validate={[required, nonEmpty, isTrimmed, validPhone]}
						/>
					</label>

					<label>Password
						<Field
							name="password"
							type="password"
							component={renderField}
							validate={[required, isTrimmed, passwordLength]}
							autocomplete="off"
						/>
					</label>
					<div className="form-field profile-form-field form-btns">
            <button className="form-reset-btn" type="reset" onClick={() => this.handleCancel()}>Cancel</button>
						<button className="form-submit-btn" type="submit">Save</button>
					</div>
				</form>
      </div>
		);
	}
}

ProfileForm.propTypes = {
	adminId : PropTypes.string,
	dispatch : PropTypes.func,
	setEdit : PropTypes.func,
	handleSubmit : PropTypes.func
};

export default connect()(reduxForm({form : 'profile'})(ProfileForm));