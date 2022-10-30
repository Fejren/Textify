import React from 'react';
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";

const Home = ({isAuthenticated}) => {
  if (!isAuthenticated) {
    return <Navigate to='/login' />
  }

  return (
    <div className={"home"}>
      <div className={"container"}>
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null)(Home);