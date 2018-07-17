import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import LoginForm from './components/Forms/loginForm';
import RegisterForm from './components/Forms/registerForm';


import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <LoginForm />
        <Route exact path="/register" component={RegisterForm} />
      </div>
    );
  }
}

export default App;
