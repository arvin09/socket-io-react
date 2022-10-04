const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

// Allow cors
app.use(cors());

// Create a HTTP server
const server = http.createServer(app);

// Configure socket.io 
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Listen to connection when new user joins the chat room
io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // create the chat room
  socket.on("join_room", (data) => {
    socket.join(data);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
});

// Listening to requests 
server.listen(3001, () => {
  console.log("Server Started! Listening on PORT 3001");
});
