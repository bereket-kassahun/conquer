const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  }
});

const rooms = {};
const players = {};

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('create-room', () => {
    const roomCode = uuidv4().slice(0, 6);
    rooms[roomCode] = {
      players: [{ id: socket.id, playerNumber: 1 }],
      host: socket.id,
    };
    socket.join(roomCode);
    socket.emit('room-created', { roomCode, players: rooms[roomCode].players });
  });

  socket.on('join-room', (roomCode) => {
    if (rooms[roomCode]) {
      if (rooms[roomCode].players.length < 4) {
        const playerNumber = rooms[roomCode].players.length + 1;
        rooms[roomCode].players.push({ id: socket.id, playerNumber });
        socket.join(roomCode);
        io.to(roomCode).emit('player-joined', rooms[roomCode].players);
      } else {
        socket.emit('error', 'Room is full');
      }
    } else {
      socket.emit('error', 'Room not found');
    }
  });

  socket.on('start-game', (roomCode) => {
    if (rooms[roomCode] && rooms[roomCode].host === socket.id) {
      io.to(roomCode).emit('game-started');
    }
  });

  socket.on('disconnect', () => {
    console.log('user disconnected:', socket.id);
    for (const roomCode in rooms) {
      const room = rooms[roomCode];
      const playerIndex = room.players.findIndex(p => p.id === socket.id);
      if (playerIndex !== -1) {
        room.players.splice(playerIndex, 1);
        io.to(roomCode).emit('player-left', room.players);
        if (room.players.length === 0) {
          delete rooms[roomCode];
        }
        break;
      }
    }
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});
