const config = require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const strategies = require('./auth/strategies');
const database = require('./config/database');
//routers
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');

const app = express();
database.connect();


//middleware
app.use(logger('combined'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//passport-local strategy
passport.use(strategies.jwt);
//routes
app.use('/', indexRouter);
app.use('/api/auth', authRouter);
app.use('/api', usersRouter);

module.exports = app;
