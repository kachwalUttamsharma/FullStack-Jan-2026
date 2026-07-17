const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);
let chatRooms = {};

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("a new user connected ", socket.id);

  socket.on("send_message", (data) => {
    console.log(data, socket.id);
    socket.broadcast.emit("broadcast", {
      ...data,
    });
  });

  socket.on("create_group", (roomId) => {
    if (!chatRooms[roomId]) {
      chatRooms[roomId] = { members: [], messages: [] };
    }
    socket.join(roomId);
    if (!chatRooms[roomId].members.includes(socket.id)) {
      chatRooms[roomId].members.push(socket.id);
    }
    console.log(chatRooms);
    io.emit("update_groups_list", Object.keys(chatRooms));
    io.to(roomId).emit("updated_members_list", chatRooms[roomId]?.members);
  });

  socket.on("join_group", (roomId) => {
    console.log(socket.id, "joined the room : ", roomId);
    if (chatRooms[roomId] && !chatRooms[roomId].members?.includes(socket.id)) {
      chatRooms[roomId].members.push(socket.id);
      socket.join(roomId);
    }
    io.to(roomId).emit("updated_members_list", chatRooms[roomId]?.members);
  });

  socket.on("leave_group", (roomId) => {
    console.log(socket.id, "leaving the room : ", roomId);
    if (chatRooms[roomId] && chatRooms[roomId].members?.includes(socket.id)) {
      chatRooms[roomId].members = chatRooms[roomId].members.filter(
        (id) => id != socket.id,
      );
      socket.leave(roomId);
    }
    io.to(roomId).emit("updated_members_list", chatRooms[roomId].members);
  });

  socket.on("group_message", (data) => {
    console.log("Group message received:", data.message);
    // update the chat room array
    const msg = {
      sender: socket.id,
      message: data.message,
    };
    chatRooms[data.roomId].messages.push(msg);
    io.to(data.roomId).emit("receive_group_message", msg);
  });
});

app.get("/", (req, res) => {
  res.send("Websocket server coming from get");
});

httpServer.listen(3000, () =>
  console.log("websocket server running on 3000 port"),
);

// http/https -> web socket
