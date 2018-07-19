import React from 'react';
import {connect} from 'react-redux';
import { fetchProfile } from '../actions/profile';
import InnerNav from './inner-nav';
import Footer from './footer';
import ProfileForm from './Forms/profileForm';

export class Profile extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      editing : false
    };
  }

  componentWillMount(){
    this.props.dispatch(fetchProfile(this.props.adminId));
  }

  handleEdit(){
    this.setState({editing : true});
  }

  handleCancel(){
    this.setState({editing: false});
  }

  render(){

    if (this.state.editing){
      return ( <main>
        <InnerNav />
        <header>
          <h1>{this.props.name}</h1>
        </header>
        <section>
          <ProfileForm 
            adminId={this.props.adminId}
            setEdit={() => this.setState({editing: false})}
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
        <InnerNav />
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
    adminId : state.auth.user.id,
    username : state.profile.data.username,
    name : state.profile.data.companyName,
    phone : state.profile.data.phoneNumber,
    email: state.profile.data.email
  };
};

export default connect(mapStateToProps)(Profile);