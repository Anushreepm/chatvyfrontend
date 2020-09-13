import React from "react";

import Chat from "./components/Chat/Chat";
import Join from "./components/Join/Join";
import HomePage from "./components/HomePage/HomePage";

import { BrowserRouter as Router, Route } from "react-router-dom";
import login from "./components/loginsignup/login";
import signup from "./components/loginsignup/signup1";
import activateAccount from "./components/loginsignup/activateAccount1";
import forgot from "./components/loginsignup/Forgot";
import ResetPassword from "../src/components/loginsignup/ResetPassword";
// import { forgotPassword } from "../../server/controller/authcontroller";

const App = () => {
  return (
    <Router>
      <Route path="/" exact component={HomePage} />
      <Route path="/join" exact component={Join} />
      <Route path="/chat" component={Chat} />
      <Route path="/signin" exact component={login} />
      <Route path="/signup" exact component={signup} />
      <Route path="/auth/activate/:token" component={activateAccount} />
      <Route path="/auth/forgot-password" exact component={forgot} />
      <Route path="/auth/reset-password/:token" exact component={ResetPassword} />
    </Router>
  );
};

export default App;
