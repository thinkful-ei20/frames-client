import React from 'react';
import NavBar from './navBar';
import RegisterForm from './Forms/registerForm';
import Footer from './footer';

export default function RegistrationPage() {
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