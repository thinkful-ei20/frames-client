import React, { Component } from 'react';
import { Route } from 'react-router-dom';


import LandingPage from './components/landingPage';
import RegistrationPage from './components/registrationPage';
import LoginPage from './components/loginPage';
import { Dashboard } from './components/dashboard';

export default class App extends Component {
  render() {

    return (
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/register" component={RegistrationPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/dashboard" component={Dashboard} />
      </div>
    );
  }
}

