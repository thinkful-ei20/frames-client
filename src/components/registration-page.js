import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import RegisterForm from './forms/register-form';
import PropTypes from 'prop-types';

import './styles/registration.css';

function RegistrationPage(props) {
	if(props.loggedIn) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<React.Fragment>
			<div className="registration">
				<section>
					<RegisterForm />
				</section>
			</div>
		</React.Fragment>
	);
}

RegistrationPage.propTypes = {
	loggedIn : PropTypes.bool
};

const mapStateToProps = state => {
	return {
		loggedIn : state.auth.user !== null
	};
};

export default connect(mapStateToProps)(RegistrationPage);
