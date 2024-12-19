const { Server } = require("socket.io");

module.exports = (req, res) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      console.log("A user connected");

      // Handle sending a message
      socket.on("sendMessage", (data) => {
        const time = new Date().toLocaleTimeString();
        socket.emit("receiveMessage", {
          username: data.username,
          message: data.message,
          time: time,
        });

        // Broadcast to all clients in the same room
        io.to(data.room).emit("receiveMessage", {
          username: data.username,
          message: data.message,
          time: time,
        });
      });

      // Room handling (optional)
      socket.on("switchRoom", (room) => {
        socket.leave("public");
        socket.leave("private");
        socket.join(room);
      });

      // User disconnecting
      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });

    res.socket.server.io = io;  // Store the reference to the WebSocket server
  }
  res.end();
};

