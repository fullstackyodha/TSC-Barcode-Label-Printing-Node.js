const {
	printBarcode,
	printBarcodeSendCMD,
} = require("../printBarcodes");

class PrintingWorker {
	constructor() {}

	async sendTaskForPrinting(job, done) {
		try {
			const items = job.data;
			console.log(items);

			// await printBarcode(items);

			await printBarcodeSendCMD(items);

			job.progress(100);

			done(null, job.data);

			// return printBarcode(items);
		} catch (error) {
			console.error(error);
			done(error);
		}
	}
}

const printWorker = new PrintingWorker();

module.exports = { printWorker };
