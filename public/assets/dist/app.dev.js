"use strict";

var socket = io(); // Capture form submission for sending a message

document.getElementById('chat-form').addEventListener('submit', function (e) {
  e.preventDefault();
  var message = document.getElementById('message').value;
  var username = document.getElementById('username').value;
  var room = 'public'; // You can modify this logic to handle room switching

  socket.emit('sendMessage', {
    username: username,
    message: message,
    room: room
  });
  document.getElementById('message').value = '';
}); // Display messages

socket.on('receiveMessage', function (data) {
  var messageContainer = document.getElementById('messages');
  var messageElement = document.createElement('div');
  messageElement.innerHTML = "<strong>".concat(data.username, "</strong> (").concat(data.time, "): ").concat(data.message);
  messageContainer.appendChild(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight; // Auto-scroll to the latest message
});
//# sourceMappingURL=app.dev.js.map
