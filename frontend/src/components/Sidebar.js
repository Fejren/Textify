import {connect} from "react-redux";
import * as messageActions from "../actions/message";
import {useEffect} from "react";
import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";

const Sidebar = ({ isAuthenticated, user, getUserChats, chats }) => {

  const waitForDetails = () => {
    let currentUser = {...user}

    setTimeout(function () {
      if(isAuthenticated && currentUser.id) {
         getUserChats(
          currentUser.id
        );
        return;
      } else {
        console.log("Waiting for details")
        waitForDetails()
      }
    }, 1000);
  }

  useEffect(() => {
    setTimeout(() => {
      waitForDetails();
    }, 100)

  }, [])

  let activeChats = chats.map(c => {
    return (
      <Chats
        key={c.id}
        contact={c.participants[0]}
        picURL="http://emilcarlsson.se/assets/louislitt.png"
        status="busy"
        chatURL={`/${c.id}`}
      />
    );
  });

return(
    <div className={"sidebar"}>
      <Navbar />
      <Search />
      <ul>
        {activeChats}
      </ul>
    </div>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.access,
  user: state.auth.user,
  chats: state.message.chats
});

const mapDispatchToProps = dispatch => {
  return {
    getUserChats: (userId, token) =>
      dispatch(messageActions.getUserChats(userId, token))
  };
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);