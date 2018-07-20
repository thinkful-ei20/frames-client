import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NavBar from './navBar';
import RegisterForm from './forms/registerForm';
import Footer from './footer';
import PropTypes from 'prop-types';

function RegistrationPage(props) {
	if(props.loggedIn) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<React.Fragment>
			<NavBar />
			<main>
				<section>
					<RegisterForm />
				</section>
			</main>
			<Footer />
		</React.Fragment>
	);
}

RegistrationPage.propTypes = {
	loggedIn : PropTypes.bool
};

const mapStateToProps = state => {
	return {
		loggedIn : state.auth.authToken !== null
	};
};

export default connect(mapStateToProps)(RegistrationPage);
