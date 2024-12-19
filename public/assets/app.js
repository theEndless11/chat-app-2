const socket = io();

// Capture form submission for sending a message
document.getElementById('chat-form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const message = document.getElementById('message').value;
  const username = document.getElementById('username').value;
  const room = 'public';  // You can modify this logic to handle room switching
  
  socket.emit('sendMessage', { username, message, room });

  document.getElementById('message').value = '';
});

// Display messages
socket.on('receiveMessage', (data) => {
  const messageContainer = document.getElementById('messages');
  const messageElement = document.createElement('div');
  
  messageElement.innerHTML = `<strong>${data.username}</strong> (${data.time}): ${data.message}`;
  messageContainer.appendChild(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight;  // Auto-scroll to the latest message
});

