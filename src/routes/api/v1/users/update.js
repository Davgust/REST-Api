const app = require('../../../../loaders/express-handlebars');
import { User } from '../../../../models/User';

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

app.put('/v1/users/:userID', jsonParser, async function (req, res, next) {
	try {
		const userID = new ObjectId(req.params.userID);

		const userExists = await User.exists({ _id: userID });

		if (!userExists) {
			res.status(404).send('User not found');
			return;
		}

		const updatedUserData = req.body;

		await User.updateOne({ _id: userID }, updatedUserData);

		res.status(200).send('USER UPDATED');
	} catch (e) {
		res.status(400).send('Invalid User Id in URL Params');
	}
});

module.exports = app;
