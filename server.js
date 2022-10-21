const express = require("express");
const app = express();
const port = 8002;
var server = require("http").Server(app);
const io = require("socket.io")(server);
const cors = require("cors");

app.use(cors());

var clients = [];

const chatList = [
  {
    chat_name: "TESTE EMPRESA WEBSOCKET S/A",
    cnpj: "12345678911234",
    date: "2022-10-19T17:52:08.808Z",
    has_unread_messages: "3",
    reference_number: "7777777-60.2022.9.27.0001",
  },
  {
    chat_name: "TESTE EMPRESA WEBSOCKET S/A",
    cnpj: "12345678911234",
    date: "2022-10-19T17:52:08.808Z",
    has_unread_messages: "2",
    reference_number: "7777777-60.2022.9.27.0002",
  },
  {
    chat_name: "TESTE EMPRESA WEBSOCKET S/A",
    cnpj: "12345678911234",
    date: "2022-10-19T17:52:08.808Z",
    has_unread_messages: "1",
    reference_number: "7777777-60.2022.9.27.0003",
  },
  {
    chat_name: "TESTE EMPRESA WEBSOCKET S/A",
    cnpj: "12345678911234",
    date: "2022-10-19T17:52:08.808Z",
    has_unread_messages: "1",
    reference_number: "7777777-60.2022.9.27.0004",
  },
  {
    chat_name: "TESTE EMPRESA WEBSOCKET S/A",
    cnpj: "12345678911234",
    date: "2022-10-19T17:52:08.808Z",
    has_unread_messages: "0",
    reference_number: "7777777-60.2022.9.27.0005",
  },
]

io.on("connection", function (client) {
  console.log('user connected: ' + client.id)

  if (clients[client.id]) {
    clients.push({ id: client.id });
  }

  client.on('chatList', () => {
    io.emit('chatList', chatList)
  })

  client.on('joinRoom', (room) => {
    client.join(room)
    clients[client.id] = { ...clients[client.id], room: room };

    console.log('user ' + client.id + ' joined to room ' + room)
  })

  client.on('leaveRoom', (room) => {
    if(room) {
      client.leave(room)

      console.log('user ' + client.id + ' leaved of room ' + room)

      clients[client.id] = { id: client.id };
    } else if (clients[client.id].room) {
      client.leave(clients[client.id].room)

      console.log('user ' + client.id + ' leaved of room ' + clients[client.id].room)

      clients[client.id] = { id: client.id };
    }
  })

  client.on('sendMessage', (message) => {
    console.log('user ' + client.id + ' send a message in room ' + clients[client.id].room + ': ' + message.message)

    console.log(client.rooms);

    io.in(clients[client.id].room).emit('chatMessage', {
      id: 11111,
      message: message.message,
      sender_document: message.sender_document,
      created_at: new Date(),
      updated_at: new Date()
    })
  })

  client.on("disconnect", function () {
    console.log("client " + client.id + " disconnected")
    clients = clients.filter(({ id }) => id !== client.id);
    console.log(client.rooms);
  });
});

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
