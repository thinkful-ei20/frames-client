import React from 'react';
import { connect } from 'react-redux'
import { Field, reduxForm, focus } from 'redux-form';

import renderField from './field';
import { login } from '../../actions/auth';
import {required, nonEmpty, isTrimmed} from './formValidators';

export class LoginForm extends React.Component {
  onSubmit = (values) => {
    console.log('Submit LoginForm ran');
    return this.props.dispatch(login(values.username, values.password));
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
      <div className="form-wrapper">
        <h2 className="form-header">Log in</h2>
        <form
          className="login-form"
          onSubmit={this.props.handleSubmit(this.onSubmit)}>
          {error}
          <Field
            name="username"
            label="Username"
            type="text"
            component={renderField}
            validate={[required, nonEmpty, isTrimmed]}
            autocomplete="off"
          />
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
      </div>
    );
  }
}

LoginForm = reduxForm({
  form: 'login',
  onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username'))
})(LoginForm);

export default LoginForm = connect(state => {
  return {
    loggedIn: state.auth.user !== null,
    user: state.auth.user,
  }
})(LoginForm);
