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
		if (this.state.isOpen & !this.props.loggedIn) {
			menu = (
				<ul className="navbar-links">
					<li><Link to="/register"><i className="fa fa-user-circle-o" aria-hidden="true"></i></Link></li>
					<li><Link to="/"><i className="fa fa-sign-in" aria-hidden="true"></i></Link></li>
				</ul>
			);
		}
		if(this.state.isOpen & this.props.loggedIn){
			menu = (
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
			);
		}

		return (
			<header className="navbar-header">
				<div>
					<Link to="/"><i className="fa fa-window-restore" aria-hidden="true"></i></Link>
				</div>
				<nav>
					{/*<button onClick={() => this.setState({ isOpen: !this.state.isOpen })}>Menu</button>*/}
					{menu}
				</nav>
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