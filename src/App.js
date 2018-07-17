import React, { Component } from 'react';

import RegisterForm from './components/Forms/registerForm';

import './App.css';

export class App extends Component {
  render() {
    return (
      <div className="App">
        <RegisterForm />
      </div>
    );
  }
}

export default App;
