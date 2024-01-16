const express = require('express');
const http = require('http');

const path = require('path');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

dotenv.config();

const PORT = process.env.PORT || 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(express.static('./public'));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('start video stream', () => {
    const streamId = uuidv4();
    console.log(`User started a video stream with ID: ${streamId}`);
    io.to(socket.id).emit('video streaming', { streamId }); // Emit only to the user who started the stream
  });

  socket.on('join video stream', (data) => {
    console.log(`User joined a video stream with ID: ${data.streamId}`);
    io.emit('video streaming', { streamId: data.streamId }); // Broadcast to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const Server = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
    console.log('Something went wrong on the server. It might be the network.');
  }
};

Server();
