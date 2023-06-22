const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const PORT = 3001;

let connections = 0;

io.on('connection', (socket) => {
  connections++;
  console.log(`Client connected. Total connections: ${connections}`);

  socket.on('disconnect', () => {
    connections--;
    console.log(`Client disconnected. Total connections: ${connections}`);
  });
});

http.listen(PORT, () => {
  console.log(`Socket Server listening on port ${PORT}`);
});
