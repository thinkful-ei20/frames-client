import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { required, isTrimmed, nonEmpty, length, matches } from './formValidators';
import renderField from './field';

const renderError = ({ meta: { touched, error } }) =>
  touched && error ? <span>{error}</span> : false;

const passwordLength = length({ min: 8, max: 72 });
const matchesPassword = matches('password');

const RegisterFormSecondPage = props => {
  const { handleSubmit, pristine, previousPage, submitting } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="email"
        label="Email"
        type="email"
        component={renderField}
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

export default reduxForm({
  form: 'register', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  // validate,
})(RegisterFormSecondPage);
