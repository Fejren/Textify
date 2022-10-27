import React from 'react';
import './assets/styles/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Provider } from 'react-redux';
import store from './store'

import { Route, Routes } from "react-router-dom"

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./containers/Layout";
import ResetPassword from "./pages/ResetPassword";
import ResetPasswordConfirm from "./pages/ResetPasswordConfirm";


const App = () => {

  return (
    <Provider store={store}>
      <Layout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset-password" element={<ResetPassword />} />
          <Route exact path="/password/reset/confirm/:uid/:token" element={<ResetPasswordConfirm />} />
          {/*<Route exact path="/activate/:uid/:token" element={< />} />*/}
          {/*<Route exact path="*" element={<NotFound />} />*/}
        </Routes>
      </Layout>
    </Provider>
)};

export default App;