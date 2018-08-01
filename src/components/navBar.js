import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import PropTypes from 'prop-types';

import {logout} from '../actions/auth';

import './styles/navBar.css';

export class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: true
		};
	}

	render() {
		let menu;
		if(this.state.isOpen & this.props.loggedIn){
			menu = (
				<nav className="main-header-navbar" >

					<ul className="navbar-links">
						<li>
							<Link to="/dashboard" title="Go to Dashboard" className={(this.props.location.pathname === '/dashboard') ? 'active' : ''}>
								<i aria-hidden="true" title="Go to Dashboard" className="fa fa-calendar-o"></i>
							</Link>
						</li>

						<li>
							<Link to="/profile" title="Go to User Profile" className={(this.props.location.pathname === '/profile') ? 'active' : ''}>
								<i aria-hidden="true" title="Go to User Profile" className="fa fa-user"></i>
							</Link>
						</li>

						<li>
							<Link to="/employees" title="Go to Employee Page" className={(this.props.location.pathname === '/employees') ? 'active' : ''}>
								<i aria-hidden="true" title="Go to Employee Page" className="fa fa-users"></i>
							</Link>
						</li>

						<li>
							<button
								className="navbar-signout-btn"
								title="Log out"
								onClick={() => this.props.dispatch(logout())}>
								<i className="fa fa-sign-out" aria-hidden="true"></i>
							</button>
						</li>
					</ul>
				</nav>

			);
		}

		return (
			<header className="main-header" role="banner">
				<div className="main-header-logo-wrapper">
					<Link to="/" title="Home / Dashboard"><i className="fa fa-window-restore" aria-hidden="true" title="Home / Dashboard"></i></Link>
					{!this.props.loggedIn && <h1>Frames</h1>}
				</div>
				{menu}
			</header>
		);
	}
}

NavBar.propTypes = {
	loggedIn : PropTypes.bool,
	dispatch : PropTypes.func
};

const mapStateToProps = state => {
	return {
		loggedIn: state.auth.user !== null
	};
};

export default withRouter(connect(mapStateToProps)(NavBar));