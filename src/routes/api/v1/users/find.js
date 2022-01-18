const app = require('../../../../loaders/express-handlebars');
import { User } from '../../../../models/User';

const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

app.get('/v1/users/:userID', async function (req, res, next) {
	try {
		const userID = new ObjectId(req.params.userID);

		const currentUser = await User.findOne({ _id: userID });

		if (!currentUser) {
			res.status(404).send('User not found');
			return;
		}

		res.status(200).send(currentUser);
	} catch (e) {
		res.status(400).send('Invalid User Id in URL Params');
	}
});

module.exports = app;
