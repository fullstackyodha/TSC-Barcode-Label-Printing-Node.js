const { printWorker } = require("../Worker/printingWorker");
const { BaseQueue } = require("./BaseQueue");

class PrintQueue extends BaseQueue {
	constructor() {
		super("printingQueue");

		// PROCESS THE JOB OF PRINTING
		this.processJob(
			"printing",
			4,
			printWorker.sendTaskForPrinting
		);
	}

	addPrinitngJob(name, data) {
		this.addJob(name, data);
	}
}

const printQueue = new PrintQueue();

module.exports = { printQueue };
