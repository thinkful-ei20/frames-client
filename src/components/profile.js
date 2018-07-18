import React from 'react';
import {connect} from 'react-redux';
import { fetchProfile } from '../actions/profile';

export class Profile extends React.Component {

  componentWillMount(){
    console.log('fetching profile');
    this.props.dispatch(fetchProfile(this.props.adminId));
  }

  render(){
    return (<div>
      test
      </div>);
  }
}

const mapStateToProps = state => {
  return {
    adminId : state.auth.user.id
  };
};

export default connect(mapStateToProps)(Profile);