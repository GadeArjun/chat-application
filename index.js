const express = require("express");
const http = require("http");
const { Server, Socket } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve(__dirname, "./public")));

const users = new Set();

io.on("connection", (socket) => {
  console.log(`connected id = ${socket.id}`);

  users.add(socket.id);
  console.log(Array.from(users));

  io.emit("users", Array.from(users));

  socket.on("disconnect", () => {
    console.log(`disconnected id = ${socket.id}`);
    users.delete(socket.id);
    io.emit("users", Array.from(users));
  });
});

server.listen(8080, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running....");
  }
});
