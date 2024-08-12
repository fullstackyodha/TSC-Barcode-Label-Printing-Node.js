'use strict';

var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const usb = require('usb');

const { printQueue } = require('./Queue/PrintingQueue');

var app = express();

app.use(cors());

const urlencodedParser = bodyParser.urlencoded({
	extended: false,
});

app.use(compression());

app.use(urlencodedParser);

app.use(express.json());

app.use(express.static('./'));

const port = process.env.PORT || 5000;

app.listen(port, function () {
	console.log('Server Start!!');
});

app.get('/test_get', function (req, res) {
	res.json({ message: 'GET Function Test!!' });
});

app.post('/api/v1/print', async function (req, res) {
	try {
		// GET THE TSC DEVICE ACCORDING TO THE VENDOR AND PRODUCT ID
		const TSC_THERMAL_PRINTER = usb
			.getDeviceList()
			.filter(
				(device) =>
					device.deviceDescriptor.idVendor === 4611 &&
					device.deviceDescriptor.idProduct === 626
			);

		if (!TSC_THERMAL_PRINTER.length) {
			throw new Error('TSC PRINTER NOT FOUND');
		}

		const { items } = req.body;

		// ADD ITEMS TO THE QUEUE
		printQueue.addPrinitngJob('printing', items);

		res.header(
			'Access-Control-Allow-Origin',
			// "http://localhost:3020"
			'*'
		);

		res.header(
			'Access-Control-Allow-Headers',
			'Origin, X-Requested-With, Content-Type, Accept'
		);

		res.status(200).json({
			message: 'Task added to prinitng queue successfully',
		});
	} catch (err) {
		res.status(404).json({
			error: err,
			message: 'TSC PRINTER Error',
		});
	}
});
