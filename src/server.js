import express from 'express';
import { config } from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import router from './route/route.js';

const app = express();
const server = http.createServer(app); 
const io = new Server(server);

app.use(express.json());
config();
const port = process.env.PORT || 5000;

app.use(router);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server connected to http://localhost:${port}`);
});

export { io };