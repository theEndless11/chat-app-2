"use strict";

var _require = require("socket.io"),
    Server = _require.Server;

module.exports = function (req, res) {
  if (!res.socket.server.io) {
    var io = new Server(res.socket.server);
    io.on("connection", function (socket) {
      console.log("A user connected"); // Handle sending a message

      socket.on("sendMessage", function (data) {
        var time = new Date().toLocaleTimeString();
        socket.emit("receiveMessage", {
          username: data.username,
          message: data.message,
          time: time
        }); // Broadcast to all clients in the same room

        io.to(data.room).emit("receiveMessage", {
          username: data.username,
          message: data.message,
          time: time
        });
      }); // Room handling (optional)

      socket.on("switchRoom", function (room) {
        socket.leave("public");
        socket.leave("private");
        socket.join(room);
      }); // User disconnecting

      socket.on("disconnect", function () {
        console.log("User disconnected");
      });
    });
    res.socket.server.io = io; // Store the reference to the WebSocket server
  }

  res.end();
};
//# sourceMappingURL=server.dev.js.map
