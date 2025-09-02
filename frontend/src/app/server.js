// server.js
import next from "next";
import { createServer } from "http";
import { Server } from "socket.io";
import express from "express";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const expressApp = express();
  const server = createServer(expressApp);
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  // Store users: socketId -> username
  const users = {};
  // Also map username -> socketId for quick lookup
  const userSockets = {};

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (username) => {
      console.log("Join event received for username:", username);




      // Check if username already exists
      if (Object.values(users).includes(username)) {
        console.log(`Username "${username}" is already taken`);
        // Emit a special event back to this socket
        socket.emit("usernameTaken", { message: "This username is already in use." });
        return; // Stop further processing
      }


      users[socket.id] = username;
      userSockets[username] = socket.id;
      console.log(`${username} joined with id ${socket.id}`);
      io.emit("userList", Object.values(users)); // optional: share online users
    });

    // handle private message
    socket.on("privateMessage", ({ to, text }) => {
      console.log("Private message event:", { to, text });
      const from = users[socket.id];
      const targetSocketId = userSockets[to];
      console.log("Target socket ID:", targetSocketId, "From:", from);
      if (targetSocketId) {
        io.to(targetSocketId).emit("privateMessage", {
          from,
          text,
          time: new Date().toISOString(),
        });
        console.log(`Private message from ${from} to ${to}: ${text}`);
      }
    });

    socket.on("disconnect", () => {
      const username = users[socket.id];
      delete userSockets[username];
      delete users[socket.id];
      console.log(`${username} disconnected`);
      io.emit("userList", Object.values(users));
    });
  });

  expressApp.all("*", (req, res) => handle(req, res));

  server.listen( process.env.PORT || 3001, () => {
    console.log(`✅ Server running at http://localhost:${process.env.PORT || 3001}`);
  });
});
