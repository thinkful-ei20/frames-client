import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { logout } from '../actions/auth';
import PropTypes from 'prop-types';

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
						<li><Link to="/dashboard" title="Go to Dashboard"><i className="fa fa-calendar-o" aria-hidden="true" title="Go to Dashboard"></i></Link></li>
						<li><Link to="/profile" title="Go to User Profile"><i className="fa fa-user" aria-hidden="true" title="Go to User Profile"></i></Link></li>
						<li><Link to="/employees" title="Go to Employee Page"><i className="fa fa-users" aria-hidden="true" title="Go to Employee Page"></i></Link></li>
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

export default connect(mapStateToProps)(NavBar);