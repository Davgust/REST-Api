const express = require('express');
const app = express();

/**
 * 	Import our Routes
 **/
// Client Route Code
const getUser = require('../routes/api/v1/users/find');
const updateUser = require('../routes/api/v1/users/update');
const insertUser = require('../routes/api/v1/users/insert');
const deleteUser = require('../routes/api/v1/users/delete');

// Server & Client (Error) Route Code
const notFound = require('../routes/both/404.js');
const serviceUnavailable = require('../routes/both/500.js');

/**
 * 	Set URLS for our Routes
 **/
// Set Client Route URLS
app.use('/', getUser);
app.use('/', updateUser);
app.use('/', insertUser);
app.use('/', deleteUser);

// Set Server & Client (Error) Route URLS
app.use('/500', serviceUnavailable);
app.use('*', notFound); // Always keep as last route

module.exports = app;
