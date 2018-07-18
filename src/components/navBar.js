import React from 'react';
import { Link } from 'react-router-dom';

export default class NavBar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpen: false
		};
	}

	render() {

		let menu;
		if (this.state.isOpen) {
			menu = (
				<ul>
					<li><Link to="/register">Register</Link></li>
					<li><Link to="/">Sign In</Link></li>
					<li><Link to="/about">About</Link></li>
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