import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoginForm from './forms/loginForm';
import About from './about';

import './styles/landing-page.css';

export class LandingPage extends React.Component {

	render() {

		if(this.props.loggedIn) {
			return <Redirect to="/dashboard" />;
		}

		return (
			<main role="main">
				<header role="banner">
					<h1>FRAMES</h1>
				</header>
				<section>
					<LoginForm />
					<p className="sign-up">
						New to Frames?
						<Link to="/register">Sign Up</Link>
					</p>
				</section>
				<section>
					<About/>
				</section>
				<section>
					{/*<Dashboard/>*/}
				</section>
				{/* <Footer /> */}
			</main>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedIn : state.auth.authToken !== null
	};
};

LandingPage.propTypes = {
	loggedIn: PropTypes.bool
};


export default connect(mapStateToProps)(LandingPage);