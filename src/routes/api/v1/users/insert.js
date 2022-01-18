const app = require('../../../../loaders/express-handlebars');
import { User } from '../../../../models/User';

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.post('/v1/users', jsonParser, async function (req, res, next) {
	const { username, password, email, age, gender } = req.body;

	const newUser = new User({
		username: username,
		password: password,
		gender: gender,
		email: email,
		age: age
	});

	newUser.save(function (error) {
		if (error) {
			console.error('Something went wrong');
			res.status(400).send('NOT OK');
			return;
		}
		console.log('Insert Successful!');
		res.status(200).send('OK');
	});
});

module.exports = app;
