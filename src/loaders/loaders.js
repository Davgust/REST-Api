const mongoose = require('mongoose');

// Import .env file values into variable 'process.env'
require('dotenv').config();

// Import Express and initialize Express Server Application
const express = require('express');
const app = express();
// Apply BasicAuth to whole API:
const basicAuth = require('express-basic-auth');

app.use(
	basicAuth({
		users: { admin: 'supersecret' },
		unauthorizedResponse: getUnauthorizedResponse
	})
);

function getUnauthorizedResponse(req) {
	return req.auth
		? '401: Credentials ' + req.auth.user + ':' + req.auth.password + ' rejected'
		: '401: No credentials provided';
}

// Import Express Handlebars for rendering HTML with {{brackets}}
app.use(require('./express-handlebars'));

// Make all files in the /public folder accessible to everyone,
// so that we can show images in the browser for example
app.use('../public', express.static('public'));

// Include API endpoints/routes
app.use(require('./routes'));

mongoose
	.connect(process.env.MONGO_CONNECTION_URL)
	.then((connection) => {
		console.log('Database connection was successful!');
	})
	.catch((err) => {
		console.error('Database connection failed: ', err);
	});

/**
 * 	Start Express Server Application
 **/
app.listen(process.env.PORT, function () {
	console.log(`App listening on port ${process.env.PORT}`);
});

module.exports = app;
