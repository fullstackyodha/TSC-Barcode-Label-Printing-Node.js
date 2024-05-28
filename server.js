"use strict";

var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");

const { printQueue } = require("./Queue/PrintingQueue");

var app = express();

app.use(cors());

const urlencodedParser = bodyParser.urlencoded({
	extended: false,
});

app.use(compression());

app.use(urlencodedParser);

app.use(express.json());

app.use(express.static("./"));

const port = process.env.PORT || 8888;

app.listen(port, function () {
	console.log("Server Start!!");
});

app.get("/test_get", function (req, res) {
	res.json({ message: "GET Function Test!!" });
});

app.post("/api/v1/print", async function (req, res) {
	const { items } = req.body;

	// ADD ITEMS TO THE QUEUE
	printQueue.addPrinitngJob("printing", items);

	res.header(
		"Access-Control-Allow-Origin",
		// "http://localhost:3020"
		"*"
	);

	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);

	res.status(200).json({
		message: "Task added to prinitng queue successfully",
	});
});
