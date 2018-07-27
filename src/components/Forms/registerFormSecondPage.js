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
			<Field
				name="email"
				label="Email"
				type="email"
				component={renderField}
				validate={[required, validEmail]}
				autocomplete="off"
			/>
			<Field
				name="password"
				label="Password"
				type="password"
				component={renderField}
				validate={[required, isTrimmed, passwordLength]}
				autocomplete="off"
			/>
			<Field
				name="passwordConfirm"
				label="Confirm password"
				type="password"
				component={renderField}
				validate={[required, nonEmpty, matchesPassword]}
				autocomplete="off"
			/>
			<button
				type="button"
				className="previous"
				onClick={previousPage}
			>
        Previous
			</button>
			<button
				type="submit"
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
