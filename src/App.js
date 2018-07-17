import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LoginForm from './components/Forms/loginForm';
import RegisterForm from './components/Forms/registerForm';

import LandingPage from './components/landingPage';
import RegistrationPage from './components/registrationPage';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={RegistrationPage} />
      </div>
    );
  }
}

export default App;
