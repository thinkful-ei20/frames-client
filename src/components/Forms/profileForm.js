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
    
		this.props.dispatch(editProfile(this.props.adminId, updatedProfile))
			.then(this.props.setEdit);
	}

	render() {
		return (
			<form
				model="user"
				onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
			>
        <Control.text model="user.lastName" />
				<Field
					name="companyName"
					label="Company Name"
					type="text"
					// value={this.props.companyName}
					defaultValue={this.props.companyName}
					component={renderField}
          validate={[isTrimmed]}
					// placeholder={this.props.companyName}
				/>
				<Field
					name="username"
					label="Username"
					type="text"
					component={renderField}
          validate={[isTrimmed]}
          placeholder={this.props.username}
				/>
				<Field
					name="email"
					label="Email Address"
					type="text"
					component={renderField}
          validate={[validEmail]}
          placeholder={this.props.email}
				/>
				<Field
					name="phoneNumber"
					label="Phone Number"
					type="text"
					component={renderField}
          validate={[isTrimmed, validPhone]}
          placeholder={this.props.phone}
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
	companyName: PropTypes.string,
	username : PropTypes.string,
	email : PropTypes.string,
	phone : PropTypes.number,
	dispatch : PropTypes.func,
	setEdit : PropTypes.func,
	handleSubmit : PropTypes.func
};

export default connect()(reduxForm({form : 'profile'})(ProfileForm));