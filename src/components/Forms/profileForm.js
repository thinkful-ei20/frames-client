import React from 'react';
import {connect} from 'react-redux';
import { Field, reduxForm, } from 'redux-form';
import renderField from './field';
import {isTrimmed, nonEmpty, required, validEmail, validPhone} from './formValidators';
import { editProfile } from '../../actions/profile';
import PropTypes from 'prop-types';

export class ProfileForm extends React.Component {
	onSubmit(values) {
		console.log('VALUES', values);
		const updatedProfile = {};
		Object.keys(values).forEach(key => {
			//Check to see if the user made a change, and only pass back key/values that are submitted
			if (values[key]) {
				updatedProfile[key] = values[key];
			}
		});
		console.log('UPDATED PROFILE', updatedProfile);
		console.log('ADMIN ID FROM PROFILE FORM', this.props);
		this.props.dispatch(editProfile(this.props.initialValues.adminId, updatedProfile))
			.then(this.props.setEdit);
	}

	render() {
		return (
			<form
				onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
			>
				<Field
					name="companyName"
					label="Company Name"
					type="text"
					component={renderField}
					validate={[isTrimmed]}
				/>
				<Field
					name="username"
					label="Username"
					type="text"
					component={renderField}
					validate={[isTrimmed]}
				/>
				<Field
					name="email"
					label="Email Address"
					type="text"
					component={renderField}
					validate={[validEmail]}
				/>
				<Field
					name="phoneNumber"
					label="Phone Number"
					type="text"
					component={renderField}
					validate={[validPhone]}
				/>
				<button type="submit">
          Save
				</button>
			</form>
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