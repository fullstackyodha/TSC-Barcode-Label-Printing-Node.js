const { printBarcode } = require("../printBarcodes");

class PrintingWorker {
	constructor() {}

	async sendTaskForPrinting(job, done) {
		try {
			const items = job.data;

			await printBarcode(items);

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
