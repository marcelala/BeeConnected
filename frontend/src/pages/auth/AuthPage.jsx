// NPM Packages
import React, { useState } from "react";

// Project files
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Auth from "../../services/Auth";
import Footer from "../../components/Footer";
import Logo from "../../assets/BeeConnected.png";

export default function LoginPage() {
  const [signIn, setSignIn] = useState(false);

  // Methods
  async function login(loginData) {
    const loginSuccess = await Auth.login(loginData);
    if (!loginSuccess) {
      alert("Invalid credentials");
    }
  }

  async function register(registrationData) {
    const registerSuccess = await Auth.register(registrationData);
    if (!registerSuccess) {
      alert("Couldn't register check credentials and try again");
    }
  }

  return (
    <div className="container">
      <nav>
        <div className="navbar-container">
          <ul className="list-container">
            <li>
              <div className="logo">
                <img src={Logo} className="logo" alt="bees" />
              </div>
            </li>
          </ul>
        </div>
      </nav>
      <section>
        {signIn && (
          <div>
            <LoginForm onSubmit={login} />
            <h2>Dont have an account?</h2>
            <button
              className="btn"
              type="button"
              onClick={() => (signIn ? setSignIn(false) : setSignIn(true))}
            >
              Sign Up
            </button>
          </div>
        )}
        {!signIn && (
          <div className="col-12 mt-4">
            <RegisterForm onSubmit={register} />
            <h2>Already a user?</h2>
            <button
              className="btn"
              type="button"
              onClick={() => (signIn ? setSignIn(false) : setSignIn(true))}
            >
              Sign In
            </button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
