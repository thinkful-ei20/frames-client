import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {isTrimmed, nonEmpty, required, validPhone, validEmail, length, matches} from './formValidators';
import renderField from './field';

export const RegisterFormFirstPage = props => {
  console.log('PROPS from FIRST PAGE', props);
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="firstName"
        label="First Name"
        type="text"
        component={renderField}
        validate={[nonEmpty, isTrimmed]}
        autocomplete="off"
      />
      <Field
        name="lastName"
        label="Last Name"
        type="text"
        component={renderField}
        validate={[nonEmpty, isTrimmed]}
        autocomplete="off"
      />
      <Field
        name="companyName"
        label="Company Name"
        type="text"
        component={renderField}
        validate={[required, nonEmpty, isTrimmed]}
        autocomplete="off"
      />
      <Field
        name="phoneNumber"
        label="Phone Number"
        type="tel"
        placeholder="123-456-7890"
        // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        component={renderField}
        validate={[required, nonEmpty, isTrimmed, validPhone]}
        autocomplete="off"
      />
      <div>
        <button
          type="submit"
          className="next"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: 'register', //                 <------ same form name
  destroyOnUnmount: false, //        <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
})(RegisterFormFirstPage);