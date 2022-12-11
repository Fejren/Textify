import React, {useState} from 'react';
import {connect} from "react-redux";
import * as messageActions from "../actions/message";
import axios from "axios";
import {API_URL} from "../settings";
import { useNavigate } from 'react-router-dom';

const Search = ({ access, user, getUserChats }) => {
  const [email, setEmail] = useState([])
  const [errors, setErrors] = useState()

  const navigate = useNavigate()

  const handleChange = e => {
    setEmail(e.target.value);
  }
  const formIsValid = () => {
    return true;
  }

  const handleSubmit = e => {
    e.preventDefault();

    if (formIsValid) {
      const currentUser = {...user}
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `JWT ${access}`
      };
      axios
        .post(`${API_URL}/chat/create/`, {
          participants: [email, currentUser.email],
        })
        .then(res => {
          navigate(`/${res.data.id}`);
          getUserChats(currentUser.id, access);
        })
        .catch(err => {
          console.error(err);
          setErrors({
            error: err
          });
        });
    }

  }

  return (
    <div className={"search"}>
      <form
        className={"searchForm"}
        onSubmit={e => handleSubmit(e)}>
        <input
          type={"text"}
          placeholder={"Znajdź użytkownika"}
          onChange={e => handleChange(e)}
        />
        <button type={"submit"} className={'addbtn'}>Dodaj</button>
      </form>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    access: state.auth.access,
    user: state.auth.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserChats: (userId, token) =>
      dispatch(messageActions.getUserChats(userId, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);