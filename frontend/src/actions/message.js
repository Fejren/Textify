import axios from "axios";
import {
  ADD_MESSAGE,
  SET_MESSAGES,
  GET_CHATS_SUCCESS
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

export const getUserChats = (userId, token) => {
  return dispatch => {
    // axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    // axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.getItem('access')}`
    };
    axios
      .get(`${API_URL}/chat/?id=${userId}`)
      .then(res => dispatch(getUserChatsSuccess(res.data)));
  };
};