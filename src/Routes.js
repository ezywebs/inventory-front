import React from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import Home from "./components/Home";
import NotFound from "./components/common/NotFound";
import Login from "./components/Login";

const Routes = () =>
  <Router>
    <Route path="/" exact component={Home} />
    <Route path="/login" exact component={Login} />
    <Route component={NotFound} />
  </Router>
  
export default withRouter(Routes);