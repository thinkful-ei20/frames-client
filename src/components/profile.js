import React from 'react';
import { connect } from 'react-redux';
import { fetchProfile } from '../actions/profile';
import Footer from './footer';
import ProfileForm from './forms/profileForm';
import PropTypes from 'prop-types';
import NavBar from './navBar';

export class Profile extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			editing: false
		};
	}

	componentWillMount() {
		this.props.dispatch(fetchProfile(this.props.adminId));
	}

	handleEdit() {
		this.setState({ editing: true });
	}

	handleCancel() {
		this.setState({ editing: false });
	}

	render() {

		if (this.state.editing) {

			return (<main>
				<NavBar />
				<header>
					<h1>{this.props.name}</h1>
				</header>
				<section>
					<ProfileForm
						initialValues={{
							adminId:this.props.adminId,
							companyName:this.props.name,
							username:this.props.username,
							email:this.props.email,
							phoneNumber:this.props.phone
						}}
						setEdit={() => this.setState({ editing: false })}
					/>
				</section>
				<button
					onClick={() => this.handleCancel()}
				>
          Cancel
				</button>
			</main>
			);
		}
		return (
			<main>
				<NavBar />
				<header>
					<h1>{this.props.name}</h1>
				</header>
				<section>
					<ul>
						<li>
							<h2>Username</h2>
							<p>{this.props.username}</p>
						</li>
						<li>
							<h2>Email Address</h2>
							<p>{this.props.email}</p>
						</li>
						<li>
							<h2>Phone Number</h2>
							<p>{this.props.phone}</p>
						</li>
					</ul>
					<button
						onClick={() => this.handleEdit()}
					>
            Edit
					</button>
				</section>
				<Footer />
			</main>
		);
	}
}

const mapStateToProps = state => {
	return {
		adminId: state.auth.user.id,
		username: state.profile.data.username,
		name: state.profile.data.companyName,
		phone: state.profile.data.phoneNumber,
		email: state.profile.data.email
	};
};

Profile.propTypes = {
	dispatch: PropTypes.func,
	adminId: PropTypes.string,
	name: PropTypes.string,
	username: PropTypes.string,
	email: PropTypes.string,
	phone: PropTypes.number
};

export default connect(mapStateToProps)(Profile);