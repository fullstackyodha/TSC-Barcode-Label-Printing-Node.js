"use strict";

var express = require("express");
var bodyParser = require("body-parser");
const cors = require("cors");

const { printQueue } = require("./Queue/PrintingQueue");

var app = express();

app.use(cors());

const urlencodedParser = bodyParser.urlencoded({
	extended: false,
});

app.use(urlencodedParser);

app.use(express.json());

app.use(express.static("./"));

app.listen(8888, function () {
	console.log("Server Start!!");
});

app.get("/test_get", function (req, res) {
	res.json({ message: "GET Function Test!!" });
});

app.post("/", async function (req, res) {
	const { items } = req.body;

	console.log(items);
	// ADD ITEMS TO THE QUEUE
	printQueue.addPrinitngJob("printing", items);

	res.header(
		"Access-Control-Allow-Origin",
		"http://localhost:3020"
		// "*"
	);

	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);

	res.status(200).json({
		message: "Task added to prinitng queue successfully",
	});
});
