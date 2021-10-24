const express = require('express');

const mainRouter = require("./main.routes");
const productsRouter = require("./products.routes");
const usersRouter = require("./users.routes");
const categoriesRouter = require("./categories.routes");


function routerApi(app) {
    const router = express.Router();
    app.use('/api/v1', router);
    router.use('/', mainRouter);
    router.use('/users', usersRouter);
    router.use('/products', productsRouter);
    router.use('/categories', categoriesRouter); 
}

module.exports = routerApi;