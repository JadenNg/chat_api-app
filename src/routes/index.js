const roomController = require('../../src/app/controllers/RoomController')
const roomRouter = require('./rooms');
const userRouter = require('./users');
function route(app) {
    app.get('/login', (req, res, next) => {
        res.render('login/show.hbs')
    })
    app.get('/', (req, res, next) => {
        res.render('login/show.hbs')
    })
    app.get('/register', (req, res, next) => {
        res.render('register/show.hbs')
    })
    app.use('/chat', (req, res, next) => {
        roomController.findAll(req, res, next)
    })
    app.use('/api/room', roomRouter)
    app.use('/api/user', userRouter)
}

module.exports = route;
