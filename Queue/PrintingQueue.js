const { printWorker } = require("../Worker/printingWorker");
const { BaseQueue } = require("./BaseQueue");

class PrintQueue extends BaseQueue {
	constructor() {
		super("printingQueue");

		// PROCESS THE JOB OF PRINTING
		this.processJob(
			"printing",
			5,
			printWorker.sendTaskForPrinting
		);
	}

	addPrinitngJob(name, data) {
		this.addJob(name, data);
	}
}

const printQueue = new PrintQueue();

module.exports = { printQueue };
