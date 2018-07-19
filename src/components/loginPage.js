import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from './forms/loginForm';
import NavBar from './navBar';
import Footer from './footer';

function LoginPage(props) {
	if(props.loggedIn) {
		return <Redirect to='/dashboard' />;
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

export default connect(mapStateToProps)(LoginPage);