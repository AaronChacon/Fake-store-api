const express = require('express');

const mainRouter = require("./main.routes");
const productsRouter = require("./products.routes");
const usersRouter = require("./users.routes");
const customersRouter = require("./customers.routes");
const categoriesRouter = require("./categories.routes");
const ordersRouter = require("./orders.routes");


function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/', mainRouter);
    router.use('/users', usersRouter);
    router.use('/products', productsRouter);
    router.use('/categories', categoriesRouter); 
    router.use('/customers', customersRouter); 
    router.use('/orders', ordersRouter); 
}

module.exports = routerApi;