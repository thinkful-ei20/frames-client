import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import NavBar from './navBar';
import LoginForm from './Forms/loginForm';
import Footer from './footer';

function LoginPage(props) {
  if(props.loggedIn) {
    return <Redirect to='/dashboard' />
  }

  return (
    <React.Fragment>
      <NavBar />
      <main>
        <section>
          <LoginForm />
        </section>
      </main>
      <Footer/>
    </React.Fragment>
  );
}

const mapStateToProps = state => ({
  loggedIn: state.auth.authToken !== null
});

export default connect(mapStateToProps)(LoginForm);