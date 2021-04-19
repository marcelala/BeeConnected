// NPM Packages
import React, { useState } from "react";

// Project files
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Auth from "../../services/Auth";
import Footer from "../../components/Footer";
import Logo from "../../assets/BeeConnected.png";
import Hive from "../../assets/Hive.jpg";

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
      <section className="authPage-container">
        {signIn && (
          <div className="authPage">
            <div>
              <img src={Hive} className="authPage--hive" alt="Hive"></img>
            </div>

            <div>
              <img src={Logo} className="authPage--logo" alt="bees" />
              <h2>Welcome to our Community</h2>
              <p>
                This community aims to help immigrants connect with local
                mentors if you’re looking for guidance in your career, language
                learning or just want to learn some new skills.
              </p>
              <LoginForm onSubmit={login} />
              <h2>Don't have an account?</h2>

              <button
                className="btn"
                type="button"
                onClick={() => (signIn ? setSignIn(false) : setSignIn(true))}
              >
                Sign Up
              </button>
            </div>
          </div>
        )}
        {!signIn && (
          <div className="authPage">
            <div>
              <img src={Hive} className="authPage--hive" alt="Hive"></img>
            </div>

            <div>
              <img src={Logo} className="authPage--logo" alt="bees" />
              <h2>Welcome to our Community</h2>
              <p>
                This community aims to help immigrants connect with local
                mentors if you’re looking for guidance in your career, language
                learning or just want to learn some new skills.
              </p>
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
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
