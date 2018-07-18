import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser } from '../../actions/users';
import RegisterFormFirstPage from './registerFormFirstPage';
import RegisterFormSecondPage from './registerFormSecondPage';

import './forms.css';

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

  handleCreateUser = values => {
    console.log('onSubmit registerForm ran');
    // e.preventDefault();
    // console.log(this.props.registerForm.values);
    // const values = this.props.registerForm.values;

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
    console.log('THIS PROPS ERROR', this.props.error);
    if(this.props.loggedin){
      console.log('LOGGED IN');
      return <Redirect to="/dashboard" />;
    }


    console.log('PROPS', this.props);
    const { page } = this.state;

    return (
      <div className="form-wrapper">
        <h2 className="form-header">Register Company</h2>
        {page === 1 &&
        <RegisterFormFirstPage
          onSubmit={this.nextPage} />}
        {page === 2 &&
        <RegisterFormSecondPage
          previousPage={this.previousPage}
          onSubmit={this.handleCreateUser}
        />
        }
        <p
          className="">
          Already have an account?
          <Link to="/login">Log In</Link>
        </p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.user !== null
});

export default connect(mapStateToProps)(RegisterForm);



