const mongoose = require('mongoose');
const chalk = require('chalk');

const host = process.env.MONGO_DB_HOST;
const port = process.env.MONGO_DB_PORT;
const db = process.env.MONGO_DB_NAME;
const databaseUrl = `mongodb://${host}:${port}/${db}`;

const connectionOptions = {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

const connected = chalk.bold.magentaBright;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

const connect = function(){

    mongoose.connect(databaseUrl, connectionOptions);

    mongoose.connection.on('connected', () => {
        console.log(connected("Mongoose default connection is open to", databaseUrl));
    });

    mongoose.connection.on('error', (err) => {
        console.log(error("Mongoose default connection has occured " + err + " error"));
    });

    mongoose.connection.on('disconnected', () => {
        console.log(disconnected("Mongoose default connection is disconnected"));
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log(termination("Mongoose default connection is disconnected due to application termination"));
            process.exit(0)
        });
    });

    return mongoose.connection;
}

module.exports = {
    connect
}