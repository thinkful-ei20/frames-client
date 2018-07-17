import React, { Component } from 'react';

import RegisterForm from './actions/Forms/registerForm';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <RegisterForm />
      </div>
    );
  }
}

export default App;
