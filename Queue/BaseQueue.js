const Queue = require("bull");

class BaseQueue {
	queue;

	constructor(queueName) {
		// Creates a new queue with the given Name;
		this.queue = new Queue(
			queueName,
			"redis://localhost:6379"
		);

		this.queue.on("completed", async (job) => {
			// Removes a completed job from the queue
			await job.remove();
			console.log(`JOB ${job?.id} COMPLETED`);
		});

		// this.queue.on("stalled", async (job) => {
		// 	console.log(`JOB ${job.id} Stalled`);

		// 	if (job.attemptsMade < job.opts.attempts) {
		// 		job.retry();
		// 		console.log(`JOB ${job.id} Retrying`);
		// 	} else {
		// 		await job.remove();
		// 		console.log(`JOB ${job.id} Removed`);
		// 	}
		// });

		// this.queue.on("failed", async (job, error) => {
		// 	console.error(`JOB ${job.id} FAILED`, error);

		// 	if (job.attemptsMade < job.opts.attempts) {
		// 		job.retry();
		// 		console.log(`JOB ${job.id} Retrying`);
		// 	} else {
		// 		await job.remove();
		// 		console.log(`JOB ${job.id} Removed`);
		// 	}
		// });

		// this.queue.on("resumed", async (job) => {
		// 	console.log(`JOB ${job.id} Resumed`);
		// });

		// this.queue.on("paused", async (job) => {
		// 	console.log(`JOB ${job.id} Paused`);
		// });

		// this.queue.on("waiting", async (job) => {
		// 	console.log(`JOB ${job.id} Waiting`);
		// });

		// this.queue.on("removed", async (job) => {
		// 	console.log(`JOB ${job.id} Removed`);
		// });
	}

	addJob(name, task) {
		this.queue.add(name, task, {
			attempts: 5,
			backoff: { type: "fixed", delay: 5000 },
		});
	}

	processJob(name, concurrency, callback) {
		this.queue.process(name, concurrency, callback);
	}
}

module.exports = { BaseQueue };
