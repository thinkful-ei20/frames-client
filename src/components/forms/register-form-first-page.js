import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import {isTrimmed, nonEmpty, required, validPhone} from './form-validators';
import renderField from './field';

export const RegisterFormFirstPage = props => {
	const { handleSubmit } = props;
	return (
		<form onSubmit={handleSubmit}>
			<fieldset>
				<legend>Registration</legend>
					<Field
						name="username"
            label="Username"
						type="text"
						component={renderField}
						validate={[required, nonEmpty, isTrimmed]}
						autocomplete="off"
						placeholder='myusername'
					/>
					<Field
						name="companyName"
						label="Company Name"
						type="text"
						component={renderField}
						validate={[required, nonEmpty, isTrimmed]}
						autocomplete="off"
						placeholder='My Company Name'
					/>
					<Field
						name="phoneNumber"
            label="Phone Number"
						type="tel"
						placeholder="1234567890"
						component={renderField}
						validate={[required, nonEmpty, isTrimmed, validPhone]}
						autocomplete="off"
					/>
				<div className="form-field form-btns">
					<button
						type="submit"
						className="next form-submit-btn"
						title="Next"
					>
						Next
					</button>
				</div>
      </fieldset>
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