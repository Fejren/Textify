import {SOCKET_URL} from "./settings";

class WebSocketService {
  static instance = null;
  callbacks = {};

  static getInstance() {
    if (!WebSocketService.instance) {
      WebSocketService.instance = new WebSocketService();
    }
    return WebSocketService.instance;
  }

  constructor() {
    this.socketRef = null;
    this.callbacks = {};
  }

  connect = chatUrl => {
    const path = `${ SOCKET_URL }/ws/chat/${chatUrl}/`;
    this.socketRef = new WebSocket(path);
    this.socketRef.onopen = () => {
      console.log("WebSocket open");
    };
    this.socketRef.onmessage = e => {
      this.socketNewMessage(e.data);
    };
    this.socketRef.onerror = e => {
      console.log(e.message);
    };
    this.socketRef.onclose = () => {
      console.log("WebSocket closed let's reopen");
      this.connect();
    };
  };

  state = () => this.socketRef.readyState;

  disconnect() {
    this.socketRef.close();
    console.log(this.socketRef)

  }

  socketNewMessage(data) {
    const parsedData = JSON.parse(data);
    const command = parsedData.command;
    if (Object.keys(this.callbacks).length === 0) {
      return;
    }
    if (command === "messages") {
      this.callbacks[command](parsedData.messages);
    }
    if (command === "new_message") {
      this.callbacks[command](parsedData.message);
    }
  }

  fetchMessages(userId, chatId) {
    this.sendMessage({
      command: "fetch_messages",
      userId: userId,
      chatId: chatId
    });
  }

  newChatMessage(message) {
    this.sendMessage({
      command: "new_message",
      from_user: message.from_user,
      message: message.content,
      chatId: message.chatId
    });
  }

  addCallbacks(messagesCallback, newMessageCallback) {
    this.callbacks["messages"] = messagesCallback;
    this.callbacks["new_message"] = newMessageCallback;
  }

  sendMessage(data) {
    try {
      this.socketRef.send(JSON.stringify({ ...data }));
      console.log('poszło')
    } catch (err) {
      console.log(err.message);
    }
  }
}

const WebSocketInstance = WebSocketService.getInstance();

export default WebSocketInstance;