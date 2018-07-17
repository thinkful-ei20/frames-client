import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import renderField from './field';
// import { login } from '../actions/auth';
import {required, nonEmpty, isTrimmed} from './formValidators';

export class LoginForm extends React.Component {
  onSubmit = (values) => {
    console.log('Submit LoginForm ran');
  };

  render() {
    let error;
    if (this.props.error) {
      error = (
        <div className="form-error" aria-live="polite">
          {this.props.error}
        </div>
      );
    }
    return (
      <form
        className="login-form"
        onSubmit={this.props.handleSubmit(this.onSubmit)}>
        {error}
        <label htmlFor="username">Username</label>
        <Field
          name="email"
          label="Email"
          type="email"
          component={renderField}
          validate={[required]}
          autocomplete="off"
        />

        <label htmlFor="password">Password</label>
        <Field
          name="password"
          label="Password"
          type="password"
          component={renderField}
          validate={[required, nonEmpty]}
          autocomplete="off"
        />
        <button
          className="register-form-btn"
          disabled={this.props.pristine || this.props.submitting}
        >
          Log in
        </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
