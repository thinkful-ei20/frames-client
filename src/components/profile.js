import React from 'react';
import { connect } from 'react-redux';
import { fetchProfile } from '../actions/profile';
import ProfileForm from './forms/profileForm';
import PropTypes from 'prop-types';
import requiresLogin from './requires-login';

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
		return (
			<main className="profile-wrapper">
				<header className="profile-header">
          <h2>My profile</h2>
					<div>
						<button
							className={this.state.editing ? 'profile-cancel-btn' : 'profile-edit-btn'}
            	onClick={this.handleEdit}
          >
          </button>
					</div>
				</header>
					{this.state.editing
					?
            <ProfileForm
              initialValues={{
                adminId:this.props.adminId,
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
                <p>{this.props.phone}</p>
							</div>
            </section>
					}
			</main>
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
		email: state.profile.data.email
	};
};

Profile.propTypes = {
	dispatch: PropTypes.func,
	adminId: PropTypes.object,
	name: PropTypes.string,
	username: PropTypes.string,
	email: PropTypes.string,
	phone: PropTypes.number
};

export default requiresLogin()(connect(mapStateToProps)(Profile));