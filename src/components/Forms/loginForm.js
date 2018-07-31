import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm, focus } from 'redux-form';

import renderField from './field';
import { login } from '../../actions/auth';
import {required, nonEmpty, isTrimmed} from './formValidators';

export class LoginForm extends React.Component {
	onSubmit = (values) => {
		return this.props.dispatch(login(values.username, values.password));
	};

	render() {
		let error;
		if (this.props.error) {
			error = (
				<div className="form-field-error" aria-live="polite">
					{this.props.error}
				</div>
			);
		}

		return (
			<div className="login-form-wrapper">
				<h2 className="form-header">Log in</h2>

				<form
					className="login-form"
					onSubmit={this.props.handleSubmit(this.onSubmit)}>
					<label>Username
						<Field
							name="username"
							type="text"
							component={renderField}
							validate={[required, nonEmpty, isTrimmed]}
							autocomplete="off"
							placeholder="username"
						/>
					</label>
					<label>Password
						<Field
							name="password"
							type="password"
							component={renderField}
							validate={[required, nonEmpty]}
							autocomplete="off"
							placeholder="password"
						/>
					</label>
					<div className="form-field form-btns">
            <button
							className="form-submit-btn"
							title="login submit button"
              disabled={this.props.pristine || this.props.submitting}
            >
              Log in
            </button>
            {error}

					</div>

				</form>
        <p className="sign-up-link">
          New to Frames?
          <Link to="/register">Sign Up</Link>
        </p>
			</div>
		);
	}
}

LoginForm = reduxForm({
	form: 'login',
	onSubmitFail: (errors, dispatch) => {
		dispatch(focus('login', 'username'))
	},
})(LoginForm);

export default LoginForm = connect(state => {
	return {
		loggedIn: state.auth.user !== null,
		user: state.auth.user
	};
})(LoginForm);
