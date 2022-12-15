import {ADD_MESSAGE, CLEAR_MESSAGES, GET_CHATS_SUCCESS, SET_MESSAGES} from "../actions/types";
import {updateObject} from "../utility";

const initialState = {
  messages: [],
  chats: []
};

const addMessage = (state, action) => {
  return updateObject(state, {
    messages: [...state.messages, action.message]
  });
};

const setMessages = (state, action) => {
  return updateObject(state, {
    messages: action.messages.reverse()
  });
};

const setChats = (state, action) => {
  return updateObject(state, {
    chats: action.chats
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return addMessage(state, action);
    case SET_MESSAGES:
      return setMessages(state, action);
    case GET_CHATS_SUCCESS:
      return setChats(state, action);
    case CLEAR_MESSAGES:
      return {
        ...state,
        messages: null,
        chats: null,
      }
    default:
      return state;
  }
};

export default reducer;