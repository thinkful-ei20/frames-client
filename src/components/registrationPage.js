import React from 'react';
import NavBar from './navBar';
import RegisterForm from './Forms/registerForm';
import Footer from './footer';

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