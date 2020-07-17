const express = require("express");
const dotenv = require('dotenv').config();
const morgan = require('morgan');
const chalk = require('chalk');
const UserRouter = require('./routers/userRouter');
const PinRouter = require('./routers/pinRouter');

const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.set('Content-Type', 'application/json');
    next();
});

const morganMiddleware = morgan(function (tokens, req, res) {
    return [
        chalk.hex('#34ace0').bold(tokens.method(req, res)),
        chalk.hex('#ffb142').bold(tokens.status(req, res)),
        chalk.hex('#ff5252').bold(tokens.url(req, res)),
        chalk.hex('#2ed573').bold(tokens['response-time'](req, res) + ' ms'),
        '\n',
    ].join(' ');
});

app.use(morganMiddleware);

app.use('/', UserRouter);
app.use('/pin', PinRouter);

app.use('*', (req, res, next) => {
    res.status(404).send('Empty Page');
});

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500);
    res.send("Error Occured!\nPlease try again later");
});

module.exports = app;