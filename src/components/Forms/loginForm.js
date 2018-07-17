import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { Link } from 'react-router-dom';
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
      <React.Fragment>
        <form
          className="login-form"
          onSubmit={this.props.handleSubmit(this.onSubmit)}>
          {error}
          <label htmlFor="username">Username</label>
          <Field
            name="username"
            label="Username"
            type="text"
            component={renderField}
            validate={[required, nonEmpty, isTrimmed]}
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
        <p
          className="">
          New to Frames?
          <Link to="/register">Sign Up</Link>
        </p>
      </React.Fragment>



    );
  }
}

export default reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);
