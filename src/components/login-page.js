import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import LoginForm from './forms/login-form';
import NavBar from './nav-bar';
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

LoginPage.propTypes = {
	loggedIn : PropTypes.bool
};

const mapStateToProps = state => ({
	loggedIn: state.auth.user !== null
});

export default connect(mapStateToProps)(LoginPage);