import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import { required, isTrimmed, nonEmpty, length, matches, validEmail } from './formValidators';
import renderField from './field';

const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches('password');

export const RegisterFormSecondPage = props => {
	const { handleSubmit, pristine, previousPage, submitting } = props;
	let error;
	if (props.error) {
		error = (
			<div className="form-error" aria-live="polite">
				{props.error}
			</div>
		);
	}

	return (

		<form onSubmit={handleSubmit}>
			{error}
			<label>Email
				<Field
					name="email"
					type="email"
					component={renderField}
					validate={[required, validEmail]}
					autocomplete="off"
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
			<label>Confirm password
				<Field
					name="passwordConfirm"
					type="password"
					component={renderField}
					validate={[required, nonEmpty, matchesPassword]}
					autocomplete="off"
				/>
			</label>
			<button
				type="button"
				className="previous"
				title="previous"
				onClick={previousPage}
			>
        Previous
			</button>
			<button
				className="form-submit-btn next"
				type="submit"
				title="Submit registration"
				disabled={pristine || submitting}
			>
        Submit
			</button>
		</form>
	);
};

RegisterFormSecondPage.propTypes = {
	handleSubmit: PropTypes.func,
	pristine: PropTypes.bool,
	previousPage: PropTypes.func,
	submitting: PropTypes.bool,
	error : PropTypes.string
};

export default reduxForm({
	form: 'register', //               <------ same form name
	destroyOnUnmount: false, //        <------ preserve form data
	forceUnregisterOnUnmount: true // <------ unregister fields on unmount
})(RegisterFormSecondPage);
