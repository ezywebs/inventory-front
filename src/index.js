import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import NotFound from "./components/common/NotFound";

ReactDOM.render(
  <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route exact path="/login" component={Login} />
      </div>
  </Router>,
  document.getElementById('root'))