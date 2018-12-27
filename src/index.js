import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "./App";
import Login from "./components/Login";
import NotFound from "./components/common/NotFound";
import Routes from "./Routes";

ReactDOM.render(
  <Routes />,
  document.getElementById('root'))