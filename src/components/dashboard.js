import React from 'react';
import RequiresLogin from './requires-login';

export class Dashboard extends React.Component {
  render(){
    return (<h1>test!</h1>);
  }
}

export default RequiresLogin()(Dashboard);