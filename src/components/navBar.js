import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import { logout } from '../actions/auth';

export class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	render() {
		console.log(this.props);
		let menu;
		if (this.state.isOpen & !this.props.loggedIn) {
			menu = (
				<ul>
					<li><Link to="/register">Register</Link></li>
					<li><Link to="/">Sign In</Link></li>
				</ul>
			);
		}
		if(this.state.isOpen & this.props.loggedIn){
			menu = (
				<ul>
					<li><Link to="/dashboard">Dashboard</Link></li>
					<li><Link to="/profile">Company Profile</Link></li>
					<li>
						<button onClick={() => this.props.dispatch(logout())}>Log Out</button>
					</li>
				</ul>
			);
		}

		return (
			<nav>
				<button onClick={() => this.setState({ isOpen: !this.state.isOpen })}>Menu</button>
				{menu}
			</nav>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedIn : state.auth.user !== null
	};
};

export default connect(mapStateToProps)(NavBar);