import React from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from "react-redux";
import NavBar from './navBar';
import RegisterForm from './Forms/registerForm';
import Footer from './footer';

<<<<<<< HEAD
export default function RegistrationPage() {
	return (
		<main>
			<NavBar />
			<section>
				<RegisterForm />
			</section>
			<Footer />
		</main>
	);
}
=======

function RegistrationPage(props) {
  if(props.loggedIn) {
    return <Redirect to='/dashboard' />
  }

  return (
    <React.Fragment>
      <NavBar />
      <main>
        <section>
          <RegisterForm />
        </section>
      </main>
      <Footer />
    </React.Fragment>
  );
}

const mapStateToProps = state => {
  return {
    loggedIn : state.auth.authToken !== null
  };
};

export default connect(mapStateToProps)(RegistrationPage);
>>>>>>> af172a046dc5201a579dd3e0777a67d70376cc0b
