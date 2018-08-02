import React from 'react';
import {connect} from 'react-redux';
import {Field,reduxForm} from 'redux-form';
import PropTypes from 'prop-types';

import renderField from './field';
import {editProfile} from '../../actions/profile';
import {isTrimmed, length, nonEmpty, required, validEmail, validPhone} from './form-validators';

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
				<div className="error-msg" aria-live="polite">
					{this.state.error}
				</div>
			);
		}
		return (
			<div className="form-wrapper">
				<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<fieldset>
						<legend>Edit Profile</legend>
						<Field
							name="companyName"
							label="Company name"
							type="text"
							component={renderField}
							validate={[required, nonEmpty, isTrimmed]}
						/>
						<Field
							name="username"
							label="Username"
							type="text"
							component={renderField}
							validate={[required, nonEmpty, isTrimmed]}
						/>
						<Field
							name="email"
							label="Email"
							type="text"
							component={renderField}
							validate={[required, validEmail]}
						/>
						<Field
							name="phoneNumber"
							label="Phone number"
							type="tel"
							component={renderField}
							validate={[required, nonEmpty, isTrimmed, validPhone]}
						/>
						<Field
							name="password"
							label="Password"
							type="password"
							component={renderField}
							validate={[required, isTrimmed, passwordLength]}
							autocomplete="off"
						/>
						<div className="form-field form-btns">
							<button className="form-reset-btn" type="button" onClick={this.props.setEdit}>Cancel</button>
							<button className="form-submit-btn	" type="submit">Save</button>
              {error}
						</div>
					</fieldset>
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