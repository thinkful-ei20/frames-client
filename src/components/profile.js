import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import ProfileForm from './forms/profile-form';
import requiresLogin from './requires-login';
import {fetchProfile} from '../actions/profile';

import './styles/profile.css';

export class Profile extends React.Component {

	constructor() {
		super();
		this.state = {
			editing: false
		};
	}

	componentWillMount() {
		this.props.dispatch(fetchProfile(this.props.adminId.id));
	}

	handleEdit = () => {
		this.setState({ editing: !this.state.editing });
	};

	render() {
    let error;
    if(this.props.error) {
      error = (
        <div className="error-msg" aria-live="polite">
          {this.props.error}
        </div>
      )
    }

		let phoneNumber;
		if (this.props.phone){
			phoneNumber = `(${this.props.phone.slice(0,3)}) ${this.props.phone.slice(3,6)}-${this.props.phone.slice(6,9)}`;
		}

		return (
			<div className="profile-page">
				{error}
				<header className="profile-header">
					<h2>profile</h2>
					<div>
						<button
							className={this.state.editing ? 'profile-cancel-btn' : 'profile-edit-btn'}
							title={this.state.editing ? 'Profile cancel button' : 'Profile edit button'}
							type="button"
							onClick={this.handleEdit}>
						</button>
					</div>
				</header>
				{this.state.editing
				?
					<ProfileForm
						initialValues={{
							adminId:this.props.adminId.id,
							companyName:this.props.name,
							username:this.props.username,
							email:this.props.email,
							phoneNumber:this.props.phone
						}}
						setEdit={this.handleEdit}
					/>
				:
					<section className="profile-section">
						<div className="profile-section-details">
							<h3>Company</h3>
							<p>{this.props.name}</p>
						</div>
						<div className="profile-section-details">
							<h3>Username</h3>
							<p>{this.props.username}</p>
						</div>
						<div className="profile-section-details">
							<h3>Email</h3>
							<p>{this.props.email}</p>
						</div>
						<div className="profile-section-details">
							<h3>Phone</h3>
							<p>{phoneNumber}</p>
						</div>
					</section>
				}
    	</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		loggedIn: state.auth.user !== null,
		adminId: state.auth.user,
		username: state.profile.data.username,
		name: state.profile.data.companyName,
		phone: state.profile.data.phoneNumber,
		email: state.profile.data.email,
		error: state.profile.error
	};
};

Profile.propTypes = {
	dispatch: PropTypes.func,
	adminId: PropTypes.object,
	name: PropTypes.string,
	username: PropTypes.string,
	email: PropTypes.string,
	phone: PropTypes.string
};

export default requiresLogin()(connect(mapStateToProps)(Profile));