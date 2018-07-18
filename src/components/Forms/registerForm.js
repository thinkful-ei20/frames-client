import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

import { createUser } from '../../actions/users';
import RegisterFormFirstPage from './registerFormFirstPage';
import RegisterFormSecondPage from './registerFormSecondPage';


export class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      page: 1,
    };
  }

  nextPage = () => {
    this.setState({ page: this.state.page + 1 });
  };

  previousPage = () => {
    this.setState({ page: this.state.page - 1 });
  };

  onSubmit = e => {
    e.preventDefault();
	const {username, email, companyName, password, phoneNumber} = this.props.registerForm.values;

    const user = {
      username,
      email,
      companyName,
      password,
      phoneNumber
    };

    this.props.dispatch(createUser(user));
  };

  render() {
    const { page } = this.state;

    return (
      <React.Fragment>
        <div>Hello RegisterForm</div>
        {page === 1 && <RegisterFormFirstPage onSubmit={ this.nextPage } />}
        {page === 2 && <RegisterFormSecondPage previousPage={ this.previousPage } onSubmit={ this.onSubmit }/>}
        <p>
          Already have an account?
          <Link to="/login">Log In</Link>
        </p>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  registerForm: state.form.register
});

export default connect(mapStateToProps)(RegisterForm);



