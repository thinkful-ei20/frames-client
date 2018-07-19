import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LandingPage from './components/landingPage';
import RegistrationPage from './components/registrationPage';
import LoginPage from './components/loginPage';
import Dashboard from './components/dashboard';
import About from './components/about';
import ModalConductor from './components/modals/modal-conductor';
import Profile from './components/profile';

export default class App extends Component {
	render() {
		return (
			<div className="App">
				<ModalConductor/>
				<Route exact path="/" component={LandingPage} />
				<Route exact path="/register" component={RegistrationPage} />
				<Route exact path="/login" component={LoginPage} />
				<Route exact path="/dashboard" component={Dashboard} />
				<Route exact path="/about" component={About} />
				<Route exact path="/profile" component={Profile} />
			</div>
		);
	}
}

