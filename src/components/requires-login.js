import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';

export default () => WrappedComponent => {

	function RequiresLogin(props) {
		const {authenticating, loggedIn, error, ...passThroughProps} = props;
		if(authenticating) {
			return <div>Logging in...</div>;
		} else if (!loggedIn || error) {
			return <Redirect to="/"/>;
		}

		/**
		 * Enzyme/Jest BUG?:
		 *
		 * 		On npm run test, line 26 below throws this warning/error:
		 *
		 * 		React.createElement: type is invalid -- expected a string (for built-in components) or a class/function
		 * 		(for composite components) but got: object.
		 *
		 */

		return <WrappedComponent {...passThroughProps} />;
	}

	const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

	RequiresLogin.displayName = `RequiresLogin(${displayName})`;

	const mapStateToProps = (state) => ({
		authenticating: state.auth.loading,
		loggedIn: state.auth.user !== null,
		error: state.auth.error
	});

	RequiresLogin.propTypes = {
		authenticating : PropTypes.bool,
		loggedIn : PropTypes.bool,
		error : PropTypes.string
	};

	return connect(mapStateToProps)(RequiresLogin);
};

