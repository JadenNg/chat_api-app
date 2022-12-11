const path = require('path');
const express = require('express');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db');
//io
const socketio = require('socket.io');


// Connect to DB
db.connect();

const app = express();
const port = 3000;

// io
var server = require('http').createServer(app);
const io = socketio(server);
io.on('connection', socket => {
    // User vào phòng
    socket.on('userJoinRoom', (room) => {
        socket.join(room);
    })


    // Nhận tin nhắn từ client
    socket.on('chatMessage', ({ inputMessage, current_room, me }) => {
        io.to(current_room).emit('serverMessage', { inputMessage, me });
    })
});

// Use static folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

// HTTP logger
// app.use(morgan('combined'));

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

server.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
