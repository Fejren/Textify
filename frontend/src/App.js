import React from 'react';
import './assets/styles/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={Home}>
        <Home />
      </Route>
      <Route path="/login" component={Login} >
        <Login />
      </Route>
      <Route path="/register" component={Register}>
        <Register />
      </Route>
    </Switch>
  </Router>
);

export default App;