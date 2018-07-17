import React from 'react';
import NavBar from './navBar';
import LoginForm from './Forms/loginForm';
import Footer from './footer';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

export class LandingPage extends React.Component {

  render() {

    if(this.props.loggedin){
      return <Redirect to="/dashboard" />;
    }
    return (
      <main role="main">
        
        <header role="banner">
          <NavBar />
          <h1>FRAMES</h1>
        </header>
        <section>
  
          <LoginForm />
        </section>
        <section>
          <div>
            <h2>Catch Phrase here</h2>
          </div>
          <div>
            <h3>One reason it is cool</h3>
            <p> And it is a very good one </p>
            <img 
              src="http://trupanion.com/blog/wp-content/uploads/2011/07/1155124917_cats-110112-3413-sm.jpg" 
              alt="hard coded "
            />
          </div>
  
          <div>
            <h3>Second reason it is cool</h3>
            <p> And it is also a very good one </p>
            <img 
              src="http://trupanion.com/blog/wp-content/uploads/2011/07/1155124917_cats-110112-3413-sm.jpg" 
              alt="hard coded "
            />
          </div>
  
          <div>
            <h3>A third reason it is cool</h3>
            <p> And it is a super good one </p>
            <img 
              src="http://trupanion.com/blog/wp-content/uploads/2011/07/1155124917_cats-110112-3413-sm.jpg" 
              alt="hard coded "
            />
          </div>
        </section>
        <Footer />
      </main>
    );
  }  
}

const mapStateToProps = state => {
  return {
    loggedin : state.auth.authToken !== null
  }; 
};

export default connect(mapStateToProps)(LandingPage);