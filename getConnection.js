const io = require('socket.io-client');

const serverURL = 'http://localhost:3001';
const socket = io(serverURL);

socket.on('connect', () => {
  console.log('Connected to socket server only once (regardless of imports)');
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

module.exports = socket;