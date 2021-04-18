// NPM Packages
import React, { useEffect, useState } from "react";
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
import Forum from "./pages/forum/Forum";
import PostsPage from "./pages/posts/PostsPage";
import ChatPage from "./pages/chat/ChatPage";
import Home from "./pages/home/Home";
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
    <div className="container">
      <BrowserRouter>
        <Navbar onLogout={() => Auth.logout()} />
        <Switch>
          <Route path="/forum">
            <Forum />
          </Route>

          <Route path="/chat">
            <ChatPage />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>

        <Footer />
      </BrowserRouter>
    </div>
  );

  return loggedIn ? loggedInRouter : <AuthPage />;
}
