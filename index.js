const express = require("express");
const http = require("http");
const { Server, Socket } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve(__dirname, "./public")));

var allUsersName = [];

io.on("connection", (socket) => {
  //
  console.log(`connected id = ${socket.id}`);

  // socket for getting all users name and there id's
  socket.on("singleUserName", (userName) => {
    // for adding the new user dtails
    allUsersName.push(userName);

    // for sending the all user name and id's
    io.emit("allUsersNameId", allUsersName);
    console.log(allUsersName);
  });

  // for seding the messages
  socket.on("chat", (msg) => {
    console.log(msg.receiverId);
    if (msg.senderId != msg.receiverId) {
      io.to(msg.senderId).emit("message", msg);
      io.to(msg.receiverId).emit("message", msg);
    } else {
      io.to(msg.receiverId).emit("message", msg);
    }
  });

  socket.on("disconnect", () => {
    console.log(`disconnected id = ${socket.id}`);

    // to remove the user which is disconneted
    allUsersName = allUsersName.filter((ele) => {
      if (ele[0][0] !== socket.id) {
        return ele;
      }
    });
    allUsersName = allUsersName.filter((ele, index) => {
      if (ele[0][1] != null) {
        return ele;
      }
    });

    // sends the updated users list
    io.emit("allUsersNameId", allUsersName);
    console.log(allUsersName, "dis");
  });
});

server.listen(8080, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running....");
  }
});
