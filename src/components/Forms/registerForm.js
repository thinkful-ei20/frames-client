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
    console.log('onSubmit registerForm ran');
    e.preventDefault();
    console.log(this.props.registerForm.values);
    const values = this.props.registerForm.values;

    const user = {
      username: values.username,
      email: values.email,
      companyName: values.companyName,
      password: values.password,
      phoneNumber: values.phoneNumber
    };

    return this.props.dispatch(createUser(user));
  };

  render() {
    console.log('PROPS', this.props);
    const { page } = this.state;

    return (
      <React.Fragment>
        <div>Hello RegisterForm</div>
        {page === 1 && <RegisterFormFirstPage onSubmit={ this.nextPage } />}
        {page === 2 &&
        <RegisterFormSecondPage
          previousPage={ this.previousPage }
          onSubmit={ this.onSubmit }
        />
        }
        <p
          className="">
          Already have an account?
          <Link to="/login">Log In</Link>
        </p>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  // loggedIn: state.auth.currentUser !== null
  registerForm: state.form.register
});

export default connect(mapStateToProps)(RegisterForm);



