import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import {isTrimmed, nonEmpty, required, validPhone} from './formValidators';
import renderField from './field';

export const RegisterFormFirstPage = props => {
	const { handleSubmit } = props;
	return (
		<form onSubmit={handleSubmit}>
			<label>Username
				<Field
					name="username"
					type="text"
					component={renderField}
					validate={[required, nonEmpty, isTrimmed]}
					autocomplete="off"
					placeholder='myusername'
				/>
			</label>
			<label>Company Name
				<Field
					name="companyName"
					type="text"
					component={renderField}
					validate={[required, nonEmpty, isTrimmed]}
					autocomplete="off"
					placeholder='My Company Name'
				/>
			</label>
			<label>Phone Number
				<Field
					name="phoneNumber"
					type="tel"
					placeholder="1234567890"
					component={renderField}
					validate={[required, nonEmpty, isTrimmed, validPhone]}
					autocomplete="off"
				/>
			</label>
			<div className="form-field form-btns">
				<button
					type="submit"
					className="next form-submit-btn"
					title="Next"
				>
					Next
				</button>
			</div>
		</form>
	);
};

RegisterFormFirstPage.propTypes = {
	handleSubmit: PropTypes.func
};

export default reduxForm({
	form: 'register', //                 <------ same form name
	destroyOnUnmount: false, //        <------ preserve form data
	forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(RegisterFormFirstPage);