require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const colors = require('colors/safe');

const app = express();
app.use(cors());
app.use(cors());
app.use(morgan('tiny'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Mongo_DB config
const { MONGO_URI } = require('./config');
mongoose
	.connect(MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
		useFindAndModify: false,
	})
	.then(() => {
		console.log(colors.brightMagenta('MongoDB Successfully connected'));
	})
	.catch((err: any) => console.log(`Error`, err));

//Import routes
import { AdminRoute, VendorRoute } from './routes';
app.use('/api', AdminRoute);
app.use('/api', VendorRoute);

const port = process.env.PORT || 9000;
app.listen(port, () => {
	console.clear();
	console.log(colors.brightMagenta(`App is running on port ${port}`));
});
