import {connect} from "react-redux";
import * as messageActions from "../actions/message";
import {useEffect} from "react";
import Contact from "./Contact";
import Navbar from "./Navbar";
import Search from "./Search";

const Sidebar = ({ isAuthenticated, user, getUserChats, chats }) => {

  useEffect(() => {
    let currentUser = {...user}
      if(isAuthenticated && currentUser.id) {
        getUserChats(
          currentUser.id
        );
        return;
      } else {
        console.log("Waiting for details")
        return;
      }
  }, [user])

  // let activeChats =

return(
    <div className={"sidebar"}>
      <Navbar />
      <Search />
      <div className={'chats'}>
        {chats && chats.map(c => {
          let currentUser = {...user}
          let fullName = `${currentUser.first_name} ${currentUser.last_name}`
          if(fullName === `${c.participants[0].first_name} ${c.participants[0].last_name}`){
            return (
              <Contact
                key={c.id}
                contact={c.participants[1]}
                chatURL={`/${c.id}`}
              />
            );
          } else {
            return (
              <Contact
                key={c.id}
                contact={c.participants[0]}
                chatURL={`/${c.id}`}
              />
            );
          }

        })}
      </div>
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