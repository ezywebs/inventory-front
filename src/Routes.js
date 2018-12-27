import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NotFound from "./components/common/NotFound";
import Login from "./components/Login";
import App from "./App";
import Body from "./components/Body"
import Main from "./components/Main"
import Navigation from "./components/Navigation"

const Routes = () =>
  <Router>
    <div className="container">
      <Navigation />
      <div >
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/login" exact component={Login} />
          <Route path="/categories" exact component={Body} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  </Router>
  
export default Routes;