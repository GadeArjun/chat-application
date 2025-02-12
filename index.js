const express = require("express");
const http = require("http");
const { Server, Socket } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve(__dirname, "./public")));

var allUsersName = [];
// for user count
var userCount = 0;
io.on("connection", (socket) => {
  //
  userCount++;
  console.log(`connected id = ${socket.id}`);

  // socket for getting all users name and there id's
  socket.on("singleUserName", (userName) => {
    // for adding the new user dtails
    allUsersName.push(userName[0]);

    // for sending the all user name and id's
    io.emit("allUsersNameId", allUsersName);
  });


  // for seding the messages
  socket.on("chat", (msg) => {
    // console.log(msg.receiverId);
    if (msg.senderId != msg.receiverId) {
      io.to(msg.senderId).emit("message", msg);
      io.to(msg.receiverId).emit("message", msg);
    } else {
      io.to(msg.receiverId).emit("message", msg);
    }
  });

  socket.on("disconnect", () => {
    console.log(`disconnected id = ${socket.id}`);
    userCount--;

    // to remove the user which is disconneted
    try {
      var newUsers = allUsersName.filter((ele) => {
        console.log(ele, "prev dis");
        if (ele[0] != socket.id && ele[1] != null) {
          console.log(ele[0], "dis");
          return ele;
        }
      });

      const uniqueUsers = [];
      const seenUser = new Set();

      newUsers.forEach((ele) => {
        if (!seenUser.has(ele[1])) {
          seenUser.add(ele[1]);
          uniqueUsers.push(ele);
        }
      });

      allUsersName = uniqueUsers;
      console.log({ allUsersName, uniqueUsers });

      if (allUsersName.length != userCount) {
        allUsersName.shift();
      }
      console.log({ allUsersName }, "2");

      // sends the updated users list
      io.emit("allUsersNameId", allUsersName);
      console.log(allUsersName, "dis");
    } catch (error) {
      console.log(err);
    }
  });
});

server.listen(8080, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("server is running....");
  }
});
