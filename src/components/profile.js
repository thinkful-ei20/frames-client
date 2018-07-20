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

	handleCancel = () => {
		this.setState({ editing: false });
  };

	render() {
		return (
			<main>
				<NavBar />
				<header>
          <h1>Account Settings</h1>
				</header>
				<section>
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
						<React.Fragment>
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
						</React.Fragment>
					}
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