import React, {Component} from 'react';
import {Route} from 'react-router-dom';

import NavBar from './nav-bar';
import LandingPage from './landing-page';
import RegistrationPage from './registration-page';
import Dashboard from './dashboard';
import ModalConductor from './modals/modal-conductor';
import Profile from './profile';
import Employees from './employees';

import './styles/about.css';

export default class App extends Component {
	render() {
		return (
			<div className="App">
				<NavBar />
				<ModalConductor/>
				<main className="main-section" role="main">
					<Route exact path="/" component={LandingPage} />
					<Route exact path="/register" component={RegistrationPage} />
					<Route exact path="/login" component={LandingPage} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route exact path="/profile" component={Profile} />
					<Route exact path="/employees" component={Employees} />
				</main>
			</div>
		);
	}
}

