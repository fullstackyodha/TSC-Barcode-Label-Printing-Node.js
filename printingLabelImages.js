const fs = require("fs");
const usb = require("usb");
const Jimp = require("jimp");
const TscBuffer = require("./tsc/TscBuffer");
const TscPrinter = require("./tsc/TscPrinter");
const sharp = require("sharp");
const bwipjs = require("bwip-js");
const path = require("path");
const { setInterval } = require("timers");

// GET THE TSC DEVICE ACCORDING TO THE VENDOR AND PRODUCT ID
const TSC_THERMAL_PRINTER = usb
	.getDeviceList()
	.filter(
		(device) =>
			device.deviceDescriptor.idVendor === 4611 &&
			device.deviceDescriptor.idProduct === 626
	);

console.log(TSC_THERMAL_PRINTER);

const printer = new TscPrinter(TSC_THERMAL_PRINTER[0]);

const printImage = (tasks) => {
	console.log("Task:", tasks);

	tasks.forEach(async (task) => {
		const imgPath = `./labels/${task.itemName}.jpeg`;
		const img = await Jimp.read(imgPath);
		const buffer = await TscBuffer.bitmap(0, 0, img.bitmap);

		await printer.Write(
			Buffer.concat([
				TscBuffer.cls(),
				buffer,
				TscBuffer.print(task.quantity),
			])
		);
	});
};

// Function to generate barcode
function generateBarcode(data) {
	return new Promise((resolve, reject) => {
		bwipjs.toBuffer(
			{
				bcid: "code128",
				text: `0${data}`,
				scale: 3,
				height: 8,
				includetext: true,
				textxalign: "center",
			},
			function (err, png) {
				if (err) {
					reject(err);
				} else {
					resolve(png);
				}
			}
		);
	});
}

// Function to create text image
function createTextImage(item) {
	const svgText = `
    <svg width="150mm" height="180mm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 60">
        <!-- Background rectangle -->
        <rect width="150mm" height="180mm"  fill="white" stroke="black" stroke-width="0.1mm"/>

        <!-- Title -->
        <text x="0.5mm" y="1.4mm" font-size="2.8" font-family="Arial" font-weight="bold">${
					item.itemName
				}</text>

        <!-- FSSAI number -->
        <text x="7mm" y="5mm" font-size="2" font-family="Arial" font-weight="bold">FSSAI NO. ${
					item.fssaiNo
				}</text>


        <!-- Marketer details -->
        <text  x="0.5mm" y="6mm" font-size="2.3" font-family="Arial" font-weight="bold">Marketed By: ${
					item.storeName
				}</text>
        <text  x="0.5mm" y="7mm" font-size="2.1" font-family="Arial" font-weight="bold">${item.address.slice(
					0,
					45
				)}</text>
        <text x="0.5mm" y="8mm" font-size="2.1" font-family="Arial" font-weight="bold">${item.address.slice(
					45
				)}</text>
        <text x="0.5mm" y="9mm" font-size="2.1" font-family="Arial" font-weight="bold">Email: ${
					item.email
				}</text>
        <text x="0.5mm" y="10mm" font-size="2.1"  font-family="Arial" font-weight="bold">Cust. Care: ${
					item.customerCare
				}</text>

        <!-- Packing details -->
        <text x="0.5mm" y="11.2mm" font-size="2.2" font-family="Arial" font-weight="bold">Packed On:</text> <text font-weight="bold" x="5.4mm" y="11.2mm" font-size="2.2" font-family="Arial">${
					item.packedOn
				}</text>
        <text x="0.5mm" y="12.2mm" font-size="2.2" font-family="Arial" font-weight="bold">Best Before:</text> <text font-weight="bold" x="5.4mm" y="12.2mm" font-size="2.2" font-family="Arial">${
					item.bestBefore
				}</text>

        <!-- Net quantity and lot number -->
        <text x="0.5mm" y="13.1mm" font-size="2.2" font-family="Arial" font-weight="bold">Lot No:</text> <text font-weight="bold" x="5mm" y="13.1mm" font-size="2.2" font-family="Arial">${
					item.lotno
				}</text>
        <text x="0.5mm" y="14.2mm" font-size="2.2" font-family="Arial" font-weight="bold">Net Qty:</text> <text font-weight="bold" x="5mm" y="14.2mm" font-size="2.5" font-family="Arial">${
					item.sku
				}</text>

        <text x="10mm" y="14.5mm" font-size="2.2" font-family="Arial" font-weight="bold">Incl. All Taxes</text>
        <text x="10mm" y="15.5mm" font-size="2.2" font-family="Arial" font-weight="bold">${
					item.pergram
				} per gm</text>

        <!-- Price details -->
        <text x="0.5mm" y="15.4mm" font-size="2.2" font-family="Arial" font-weight="bold">M.R.P.:</text> <text font-weight="bold" x="5mm" y="15.4mm" font-size="2.4" font-family="Arial">₹ ${
					item.mrp
				}</text>
        <text x="0.5mm" y="16.4mm" font-size="2.2" font-family="Arial" font-weight="bold">R.R.P.:</text> <text font-weight="bold" x="5mm" y="16.4mm" font-size="2.4" font-family="Arial">₹ ${
					item.rrp
				}</text>

        <!-- Packer details -->
        <text x="0.5mm" y="17.5mm"  font-size="2.2"  font-family="Arial" font-weight="bold">Packed By: PRPM Services Pvt Ltd</text>
        <text x="0.5mm" y="18.5mm"  font-size="2"  font-family="Arial" font-weight="bold">G-25, Sidhpura Industrial Estate, Gaiwadi Rd</text>
        <text x="0.5mm" y="19.5mm"  font-size="2" font-family="Arial" font-weight="bold">S.V. Road, Goregaon West 400104.</text>
        <text x="0.5mm" y="20.5mm"  font-size="1.8" font-family="Arial" font-weight="bold">FSSAI NO. 115200054000</text>
    </svg>
    `;
	return Buffer.from(svgText);
}

// Combine text and barcode into a single image
async function createImageWithBarcode(item) {
	try {
		const mmToPx = (mm) => Math.round(mm * 3.779528); // Conversion and rounding to integer

		const itemName = createTextImage(item);
		const barcode = await generateBarcode(item.barcode);

		const itemNameImage = await sharp(itemName)
			.resize(mmToPx(108), mmToPx(129))
			.rotate(180)
			.jpeg()
			.toBuffer();

		const barcodeImage = await sharp(barcode)
			.resize(mmToPx(40), mmToPx(15))
			.rotate(180)
			.png()
			.toBuffer();

		const combinedImage = await sharp({
			create: {
				width: mmToPx(108),
				height: mmToPx(129),
				channels: 4,
				background: { r: 255, g: 255, b: 255, alpha: 1 },
			},
		})
			.composite([
				{
					input: itemNameImage,
					top: 0,
					left: 0,
				},
				{
					input: barcodeImage,
					top: mmToPx(104),
					left: mmToPx(60),
				},
			])
			// .resize(mmToPx(130), mmToPx(140))
			.jpeg()
			.toBuffer();

		fs.writeFileSync(
			`./labels/${item.itemName}.jpeg`,
			combinedImage
		);

		console.log(`Image saved as ${item.itemName}.png`);

		return {
			itemName: item.itemName,
			quantity: item.quantity,
		};
	} catch (error) {
		console.error(
			"Error creating image with barcode:",
			error
		);
	}
}

async function printLabels(items) {
	console.log(items);

	let allPrintingTask = [];

	for (const item of items) {
		allPrintingTask.push(
			await createImageWithBarcode(item)
		);
	}

	printImage(allPrintingTask);

	allPrintingTask = [];

	console.log(allPrintingTask);
}

function removeAllFiles() {
	fs.readdir(`./labels`, (err, files) => {
		if (err) {
			console.error(
				`Unable to read directory: ${err.message}`
			);
			return;
		}

		files.forEach((file) => {
			const filePath = path.join(`./labels`, file);

			console.log(`Deleting file: ${filePath}`);
			fs.unlink(filePath, (err) => {
				if (err) {
					console.error(
						`Unable to delete file ${filePath}: ${err.message}`
					);
				} else {
					console.log(`Deleted file: ${filePath}`);
				}
			});
		});
	});
}

setInterval(() => {
	removeAllFiles();
}, 2000);

// allPrintingTask.push(
// 	await createImageWithBarcode({
// 		itemId: 35,
// 		itemName: "California Badam",
// 		barcode: 4583272,
// 		fssaiNo: 1132198374462,
// 		storeName: "Cheeda Sales",
// 		address:
// 			"Shop No 18 Plot No 26 Alankar Shivaji Chowk, Shopping Center New Plaza, Malad East.",
// 		email: "cheedasales@gmail.com",
// 		customerCare: 9820461013,
// 		packedOn: "15/05/2024",
// 		bestBefore: "15/08/2024",
// 		mrp: "1200",
// 		rrp: "950",
// 		pergram: 0.95,
// 		sku: "1kg",
// 		unit: "kg",
// 		cp: 50,
// 		lotno: "B-103",
// 		quantity: 4,
// 	})
// );

// allPrintingTask.push(
// 	await createImageWithBarcode({
// 		itemId: 35,
// 		itemName: "Ajwain Premium",
// 		barcode: 4583234,
// 		fssaiNo: 1132198374462,
// 		storeName: "Janta Market",
// 		address:
// 			"Shop No 18 Plot No 26 Alankar Shivaji Chowk, Shopping Center New Plaza, Malad East.",
// 		email: "jantamarket@gmail.com",
// 		customerCare: 9820461013,
// 		packedOn: "15/05/2024",
// 		bestBefore: "15/08/2024",
// 		mrp: "560",
// 		rrp: "450",
// 		pergram: 0.23,
// 		sku: "2kg",
// 		unit: "kg",
// 		cp: 50,
// 		lotno: "B-103",
// 		quantity: 6,
// 	})
// );

module.exports = { printLabels };
