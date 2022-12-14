import axios from "axios";
import {
  ADD_MESSAGE,
  SET_MESSAGES,
  GET_CHATS_SUCCESS, CLEAR_MESSAGES
} from "./types";

import { API_URL } from "../settings";

export const addMessage = message => async dispatch => {
  dispatch ({
    type: ADD_MESSAGE,
    message: message
  });
};

export const setMessages = messages => async dispatch => {
  dispatch ({
    type: SET_MESSAGES,
    messages: messages
  });
};

const getUserChatsSuccess = chats => async dispatch => {
  dispatch ({
    type: GET_CHATS_SUCCESS,
    chats: chats
  });
};

export const clearMessages = () => dispatch => {
  dispatch({
    type: CLEAR_MESSAGES
  });
};

export const getUserChats = (userId) => {
  return dispatch => {
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem('access')}`
    };
    axios
      .get(`${API_URL}/chat/?id=${userId}`)
      .then(res => dispatch(getUserChatsSuccess(res.data)));
  };
};