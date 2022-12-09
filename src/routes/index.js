const configsRouter = require('./configs');
const usersRouter = require('./users');
const productsRouter = require('./products');
const importsRouter = require('./imports');
const ordersRouter = require('./orders');
const machinesRouter = require('./machines');
const workstationsRouter = require('./workstations');
const roomRouter = require('./rooms');

function route(app) {
    app.use('/api/config', configsRouter);
    app.use('/api/user',usersRouter)
    app.use('/api/product',productsRouter)
    app.use('/api/import',importsRouter)
    app.use('/api/order',ordersRouter)
    app.use('/api/machine',machinesRouter)
    app.use('/api/workstation',workstationsRouter)
    app.use('/api/room',roomRouter)
}

module.exports = route;
