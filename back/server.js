const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const dbString = 'mongodb://admin:admin@db:27017/?authSource=admin';

mongoose
    .connect(dbString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to db');
    })
    .catch((err) => {
        console.log('Impossible to connect db', err);
        process.exit();
    });

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: { origin: 'http://localhost:3000', methods: ['GET', 'POST', 'PUT', 'DELETE'] },
});

io.on('connection', (socket) => {
    console.log('User connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
    socket.on('save-message', (data) => {
        console.log(data);
        io.emit('new-message', { message: data });
    });
});

const User = require('./models/user');
const Room = require('./models/room');
const Chat = require('./models/chat');

const userRoutes = require('./routes/user');
const roomRoutes = require('./routes/room');
const chatRoutes = require('./routes/chat');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content,Accept,Content-Type,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/user', userRoutes);
app.use('/room', roomRoutes);
app.use('/chat', chatRoutes);

server.listen(9000);

module.exports = app;
