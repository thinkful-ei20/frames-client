import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import RegisterForm from './forms/registerForm';
import PropTypes from 'prop-types';

function RegistrationPage(props) {
	if(props.loggedIn) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<React.Fragment>
			<main>
				<section>
					<RegisterForm />
				</section>
			</main>
		</React.Fragment>
	);
}

RegistrationPage.propTypes = {
	loggedIn : PropTypes.bool
};

const mapStateToProps = state => {
	return {
		// loggedIn : state.auth.authToken !== null,
		loggedIn : state.auth.user !== null
	};
};

export default connect(mapStateToProps)(RegistrationPage);
