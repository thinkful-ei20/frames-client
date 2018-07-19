import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import NavBar from './navBar';
import RegisterForm from './forms/registerForm';
import Footer from './footer';


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


const mapStateToProps = state => {
	return {
		loggedIn : state.auth.authToken !== null
	};
};

export default connect(mapStateToProps)(RegistrationPage);
