import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  //Room State
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  // Join Room
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  // Send Message
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  // Receive updated Messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
    setMessageReceived(data.message) 
  });

  }, [socket]);

  // Template
  return (
    <div className="App">
      <input
        placeholder="Chat Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <br/>
      <br/>
      <button onClick={joinRoom}> Join Room</button>
      <br/>
      <br/>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send </button>
      <h2> All Messages: </h2>
      {messageReceived}
    </div>
  );
}

export default App;
