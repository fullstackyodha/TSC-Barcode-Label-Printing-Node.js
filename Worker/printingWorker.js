const { printBarcode } = require("../printBarcodes");
const { printLabels } = require("../printingLabelImages");

class PrintingWorker {
	constructor() {}

	async sendTaskForPrinting(job, done) {
		try {
			const items = job.data;
			console.log("WORKER: " + items);

			// WITH TSC .DLL COMMANDS
			// await printBarcode(items);

			// WITH LABEL IMAGES
			await printLabels(items);

			job.progress(100);

			done(null, job.data);
		} catch (error) {
			console.error(error);
			done(error);
		}
	}
}

const printWorker = new PrintingWorker();

module.exports = { printWorker };
