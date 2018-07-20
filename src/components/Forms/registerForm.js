import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createUser } from '../../actions/users';
import RegisterFormFirstPage from './registerFormFirstPage';
import RegisterFormSecondPage from './registerFormSecondPage';

import './styles/forms.css';

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
	const {username, email, companyName, password, phoneNumber} = values;

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

    if(this.props.loggedIn){
      return <Redirect to="/dashboard" />;
    }

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



