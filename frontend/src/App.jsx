// NPM Packages
import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// import fontawesome components
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

// Project files
import Auth from "./services/Auth";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthPage from "./pages/auth/AuthPage";
import HomePage from "./pages/home/HomePage";
import PostsPage from "./pages/posts/PostsPage";
import ChatPage from "./pages/chat/ChatPage";
import "./styles/App.css";
//import icons to library
library.add(fab, far, fas);

export default function App() {
  // State
  const [loggedIn, setLoggedIn] = useState(Auth.isLoggedIn());

  // Constants
  Auth.bindLoggedInStateSetter(setLoggedIn);

  // Components
  const loggedInRouter = (
    <div className="main">
      <BrowserRouter>
        <Navbar onLogout={() => Auth.logout()} />

        <div className="container route">
          <Switch>
            <Route path="/posts">
              <PostsPage />
            </Route>

            <Route path="/chat">
              <ChatPage />
            </Route>

            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );

  return loggedIn ? loggedInRouter : <AuthPage />;
}
