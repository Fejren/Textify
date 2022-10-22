import React from 'react';
import './assets/styles/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Provider } from 'react-redux';
import store from './store'

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        {/*<Route exact path='/reset-password' component={} />*/}
        {/*<Route exact path='/password/reset/confirm/:uid/:token' component={} />*/}
        {/*<Route exact path='/activate/:uid/:token' component={} />*/}
      </Switch>
    </Router>
  </Provider>
);

export default App;