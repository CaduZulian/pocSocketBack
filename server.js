const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
require('dotenv').config();

const app = require('./app');
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('message', 'a user connected')

  socket.on('message', (message) => {
    console.log(message)
    socket.emit('message', message)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

console.log(`\nserver running at port http://localhost:${process.env.PORT}\n`)

httpServer.listen(process.env.PORT);