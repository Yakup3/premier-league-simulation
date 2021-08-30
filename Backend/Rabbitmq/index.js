const express = require('express');
const app = express();
const server = require('http').createServer(app).listen(3000, () => { console.log("Server is listening") });
const io = require('socket.io')(server, { cors: { origin: '*' }, methods: ["GET"] });

const { SocketServer } = require("./socketServer");
const rabbitConsumer = require("./consumer");

const socket = new SocketServer(io);
rabbitConsumer.connect(socket);

module.exports = SocketServer;
