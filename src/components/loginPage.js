import React from 'react';
import NavBar from './navBar';
import LoginForm from './Forms/loginForm';
import Footer from './footer';

export default function LoginPage() {
  return (
    <React.Fragment>
      <NavBar />
      <main>
        <section>
          <LoginForm />
        </section>
      </main>
      <Footer/>
    </React.Fragment>
  );
}
