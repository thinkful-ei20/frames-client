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
		// if (this.state.isOpen & !this.props.loggedIn) {
		// 	menu = (
		//    <nav className="main-header-navbar" role="navigation">
		//
		// 		<ul className="navbar-links">
		// 			<li><Link to="/register"><i className="fa fa-user-circle-o" aria-hidden="true"></i></Link></li>
		// 			{/*<li><Link to="/"><i className="fa fa-sign-in" aria-hidden="true"></i></Link></li>*/}
		// 		</ul>
		//    </nav>
		//
		//  );
		// }
		if(this.state.isOpen & this.props.loggedIn){
			menu = (
				<nav className="main-header-navbar" >

					<ul className="navbar-links">
						<li><Link to="/dashboard"><i className="fa fa-calendar-o" aria-hidden="true"></i></Link></li>
						<li><Link to="/profile"><i className="fa fa-user" aria-hidden="true"></i></Link></li>
						<li><Link to="/employees"><i className="fa fa-users" aria-hidden="true"></i></Link></li>
						<li>
							<button
								className="navbar-signout-btn"
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
					<Link to="/"><i className="fa fa-window-restore" aria-hidden="true"></i></Link>
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