const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');

const route = require('./routes');
const db = require('./config/db');

// Connect to DB
db.connect();

const app = express();
const port = 3000;

// io
var server = require('http').createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origins: ['http://localhost:8080',
            'http://localhost:8081']
    }
});
io.on('connection', (socket) => {
    const socketId =  socket.id
    socket.emit('socketID', socketId)
    console.log('a user connected');
    socket.on("send", (data) => {
        io.emit('receive',data)
      });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
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
