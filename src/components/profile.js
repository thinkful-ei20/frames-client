import React from 'react';
import { connect } from 'react-redux';
import { fetchProfile } from '../actions/profile';
import Footer from './footer';
import ProfileForm from './forms/profileForm';
import PropTypes from 'prop-types';
import NavBar from './navBar';

import './profile.css';

export class Profile extends React.Component {

	constructor() {
		super();
		this.state = {
			editing: false
		};
	}

	componentWillMount() {
		this.props.dispatch(fetchProfile(this.props.adminId));
	}

	handleEdit = () => {
		this.setState({ editing: !this.state.editing });
	};

	handleCancel = () => {
		this.setState({ editing: false });
  };

	render() {
		return (

			<main className="profile-wrapper">

				<header className="profile-header">
          <h2>Account Settings</h2>
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
              setEdit={this.handleCancel}
            />
					:
            <section className="profile-section">
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