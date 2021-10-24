/* eslint-disable no-console */
const express = require('express');
const routerApi = require('./routes');
const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const cors = require('cors');


const app = express();
const port = process.env.PORT || 3005;

app.use(express.json());

const whitelist = ['http://localhost:3005', 'https://aaronch.com'];
const options = {
    origin: (origin, callback) => {
        if (whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('not allowed'));
        }
    }
}
app.use(cors(options));

routerApi(app);

// middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () =>{
    console.log('port:_' + port);
});



