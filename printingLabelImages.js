const fs = require('fs');
const usb = require('usb');
const Jimp = require('jimp');
const TscBuffer = require('./tsc/TscBuffer');
const TscPrinter = require('./tsc/TscPrinter');
const sharp = require('sharp');
const bwipjs = require('bwip-js');
const path = require('path');
const { setInterval } = require('timers');

// GET THE TSC DEVICE ACCORDING TO THE VENDOR AND PRODUCT ID
const TSC_THERMAL_PRINTER = usb
	.getDeviceList()
	.filter(
		(device) =>
			device.deviceDescriptor.idVendor === 4611 &&
			device.deviceDescriptor.idProduct === 626
	);

const printer = new TscPrinter(TSC_THERMAL_PRINTER[0]);

const printImage = (tasks) => {
	console.log('Task:', tasks);

	tasks.forEach(async (task) => {
		const imgPath = `./labels/${task.itemName}.jpeg`;
		const img = await Jimp.read(imgPath);
		const buffer = await TscBuffer.bitmap(-0, 0, img.bitmap);

		await printer.Write(
			Buffer.concat([
				TscBuffer.cls(),
				buffer,
				TscBuffer.speed(3),
				TscBuffer.density(12),
				TscBuffer.print(task.quantity),
			])
		);
	});

	console.log('DELETING...!!!');

	setInterval(() => {
		fs.readdir(`./labels`, (err, files) => {
			if (err) {
				console.error(`Unable to read directory: ${err.message}`);
				return;
			}

			tasks.forEach((file) => {

				fs.readdir(`./labels`, (err, files) => {
					if (err) {
						console.error(`Unable to read directory: ${err.message}`);
						return;
					}

					if (files.length === 0) {
						console.log('Exiting...');
						process.exit(0)
					}}
				)

				const filePath = path.join(`./labels`, `${file.itemName}.jpeg`);
	
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
	}, 1000);


};

// Function to generate barcode
function generateBarcode(data) {
	let barcodeData = `${data}`;

	return new Promise((resolve, reject) => {
		bwipjs.toBuffer(
			{
				bcid: 'code128',
				text:
					barcodeData.length >= 7
						? `${barcodeData}`
						: `${barcodeData}`.padStart(7, '0'),
				scale: 8,
				height: 8,
				includetext: true,
				textxalign: 'center',
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
function createTextImagewithRRP(item) {
	const svgText = `
    <svg width="180mm" height="180mm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
        <!-- Background rectangle -->
        <rect width="180mm" height="180mm" fill="white" stroke="black" stroke-width="0.1mm"/>

        <!-- Title -->
        <text x="2.5mm" y="2.2mm" font-size="3" font-family="Arial" font-weight="bold">${
			item.itemName
		}</text>

        <!-- FSSAI number -->
        <text x="10mm" y="6mm" font-size="2.2" font-family="Arial" font-weight="bold">FSSAI NO. ${
			item.fssaiNo
		}</text>


        <!-- Marketer details -->
        <text  x="2.5mm" y="7mm" font-size="2.1" font-family="Arial" font-weight="bold">Marketed By: ${
			item.storeName
		}</text>
        <text  x="2.5mm" y="8mm" font-size="2.1" font-family="Arial" font-weight="bold">${item.address.slice(
			0,
			45
		)}</text>
        <text x="2.5mm" y="9mm" font-size="2.1" font-family="Arial" font-weight="bold">Email: ${
			item.email
		}</text>

		<!-- Customer Care -->
		<text x="60" y="52" font-size="2.2" font-family="Arial" font-weight="bold" transform="rotate(-90, 60, 52)">Cust. Care: ${
			item.customerCare
		}</text>

        <!-- Packing details -->
        <text x="2.5mm" y="11.4mm" font-size="2.4" font-family="Arial" font-weight="bold">Packed On:</text> <text font-weight="bold" x="7.7mm" y="11.4mm" font-size="2.6" font-family="Arial">${
			item.packedOn
		}</text>
        <text x="2.5mm" y="12.6mm" font-size="2.4" font-family="Arial" font-weight="bold">Best Before:</text> <text font-weight="bold" x="7.7mm" y="12.6mm" font-size="2.6" font-family="Arial">${
			item.bestBefore
		}</text>

        <!-- Net quantity and lot number -->
        <text x="14mm" y="13.9mm" font-size="2.2" font-family="Arial" font-weight="bold">Lot No:</text> <text font-weight="bold" x="17mm" y="13.9mm" font-size="2.2" font-family="Arial">${
			item.lotno
		}</text>
        <text x="2.5mm" y="13.9mm" font-size="2.4" font-family="Arial" font-weight="bold">Net Qty:</text> <text font-weight="bold" x="7mm" y="13.9mm" font-size="2.6" font-family="Arial">${
			item.sku
		}</text>

        <text x="14mm" y="15.4mm" font-size="2.2" font-family="Arial" font-weight="bold">Incl. All Taxes</text>
        <text x="14mm" y="16.4mm" font-size="2.2" font-family="Arial" font-weight="bold">${
			item.pergram
		} per gm</text>

        <!-- Price details -->
        <text x="2.5mm" y="15.4mm" font-size="2.4" font-family="Arial" font-weight="bold">M.R.P.:</text> <text font-weight="bold" x="7mm" y="15.4mm" font-size="2.9" font-family="Arial">₹ ${
			item.mrp
		}/-</text>
        <text x="2.5mm" y="16.7mm" font-size="2.4" font-family="Arial" font-weight="bold">R.R.P.:</text> <text font-weight="bold" x="7mm" y="16.7mm" font-size="2.9" font-family="Arial">₹ ${
			item.rrp
		}/-</text>

        <!-- Packer details -->
        <text x="2.5mm" y="18mm"  font-size="2.2"  font-family="Arial" font-weight="bold">Re-Packed By: PRPM Services Pvt Ltd</text>
        <text x="2.5mm" y="19mm"  font-size="2.1"  font-family="Arial" font-weight="bold">G-25, Sidhpura Industrial Estate, Gaiwadi Rd</text>
        <text x="2.5mm" y="20mm"  font-size="2.1" font-family="Arial" font-weight="bold">S.V. Road, Goregaon West 400104.</text>
        <text x="2.5mm" y="21mm"  font-size="2.1" font-family="Arial" font-weight="bold">FSSAI NO. 11522016000043</text>
    </svg>
    `;

	return Buffer.from(svgText);
}

function createTextImageWithoutRRP(item) {
	const svgText = `
    <svg width="180mm" height="180mm" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
        <!-- Background rectangle -->
        <rect width="180mm" height="180mm" fill="white" stroke="black" stroke-width="0.1mm"/>

        <!-- Title -->
        <text x="2.5mm" y="2.2mm" font-size="3" font-family="Arial" font-weight="bold">${
			item.itemName
		}</text>

        <!-- FSSAI number -->
        <text x="10mm" y="6mm" font-size="2.2" font-family="Arial" font-weight="bold">FSSAI NO. ${
			item.fssaiNo
		}</text>


        <!-- Marketer details -->
        <text  x="2.5mm" y="7mm" font-size="2.1" font-family="Arial" font-weight="bold">Marketed By: ${
			item.storeName
		}</text>
        <text  x="2.5mm" y="8mm" font-size="2.1" font-family="Arial" font-weight="bold">${item.address.slice(
			0,
			45
		)}</text>
        <text x="2.5mm" y="9mm" font-size="2.1" font-family="Arial" font-weight="bold">Email: ${
			item.email
		}</text>

		<!-- Customer Care -->
		<text x="60" y="52" font-size="2.2" font-family="Arial" font-weight="bold" transform="rotate(-90, 60, 52)">Cust. Care: ${
			item.customerCare
		}</text>

        <!-- Packing details -->
        <text x="2.5mm" y="11.7mm" font-size="2.4" font-family="Arial" font-weight="bold">Packed On:</text> <text font-weight="bold" x="7.7mm" y="11.7mm" font-size="2.6" font-family="Arial">${
			item.packedOn
		}</text>
        <text x="2.5mm" y="12.9mm" font-size="2.4" font-family="Arial" font-weight="bold">Best Before:</text> <text font-weight="bold" x="7.7mm" y="12.9mm" font-size="2.6" font-family="Arial">${
			item.bestBefore
		}</text>

        <!-- Net quantity and lot number -->
        <text x="14mm" y="13.9mm" font-size="2.2" font-family="Arial" font-weight="bold">Lot No:</text> <text font-weight="bold" x="17mm" y="13.9mm" font-size="2.2" font-family="Arial">${
			item.lotno
		}</text>
        <text x="2.5mm" y="14.2mm" font-size="2.4" font-family="Arial" font-weight="bold">Net Qty:</text> <text font-weight="bold" x="7mm" y="14.2mm" font-size="2.6" font-family="Arial">${
			item.sku
		}</text>

        <text x="14mm" y="15.4mm" font-size="2.2" font-family="Arial" font-weight="bold">Incl. All Taxes</text>
        <text x="14mm" y="16.4mm" font-size="2.2" font-family="Arial" font-weight="bold">${
			item.pergram
		} per gm</text>

        <!-- Price details -->
        <text x="2.5mm" y="15.7mm" font-size="2.4" font-family="Arial" font-weight="bold">M.R.P.:</text> <text font-weight="bold" x="7mm" y="15.7mm" font-size="2.9" font-family="Arial">₹ ${
			item.mrp
		}/-</text>
        

        <!-- Packer details -->
        <text x="2.5mm" y="18mm"  font-size="2.2"  font-family="Arial" font-weight="bold">Re-Packed By: PRPM Services Pvt Ltd</text>
        <text x="2.5mm" y="19mm"  font-size="2.1"  font-family="Arial" font-weight="bold">G-25, Sidhpura Industrial Estate, Gaiwadi Rd</text>
        <text x="2.5mm" y="20mm"  font-size="2.1" font-family="Arial" font-weight="bold">S.V. Road, Goregaon West 400104.</text>
        <text x="2.5mm" y="21mm"  font-size="2.1" font-family="Arial" font-weight="bold">FSSAI NO. 11522016000043</text>
    </svg>
    `;

	return Buffer.from(svgText);
}

// Combine text and barcode into a single image
async function createImageWithBarcode(item) {
	try {
		const mmToPx = (mm) => Math.round(mm * 4.9); // Conversion and rounding to integer 3.979528

		const itemName =
			item?.rrp === item?.mrp ||
			item?.rrp === 0 ||
			item?.rrp === '' ||
			item?.rrp === null
				? createTextImageWithoutRRP(item)
				: createTextImagewithRRP(item);

		const barcode = await generateBarcode(item.barcode);

		const itemNameImage = await sharp(itemName)
			.resize(mmToPx(100), mmToPx(100))
			.rotate(180)
			.jpeg()
			.toBuffer();

		const barcodeImage = await sharp(barcode)
			.resize(mmToPx(40), mmToPx(10), { fit: 'fill' })
			.rotate(180)
			.png()
			.toBuffer();

		const combinedImage = await sharp({
			create: {
				width: mmToPx(100),
				height: mmToPx(100),
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
					top: mmToPx(77),
					left: mmToPx(45),
				},
			])
			.jpeg()
			.toBuffer();

		let time = Date.now();

		fs.writeFileSync(
			`./labels/${item.barcode}-${time}.jpeg`,
			combinedImage
		);
		// ${item.itemName}-${item.skuName}-${item.sku}-${item.mrp}-${item.rrp}-

		console.log(
			`Image saved as ${item.barcode}-${time}.jpeg`
		);
		// ${item.itemName}-${item.skuName}-${item.sku}-${item.mrp}-${item.rrp}-

		return {
			itemName: `${item.barcode}-${time}`,
			// ${item.itemName}-${item.skuName}-${item.sku}-${item.mrp}-${item.rrp}-
			quantity: item.quantity,
		};
	} catch (error) {
		console.error('Error creating image with barcode:', error);
	}
}

async function printLabels(items) {
	console.log(items);

	let allPrintingTask = [];

	for (const item of items) {
		allPrintingTask.push(await createImageWithBarcode(item));
	}

	printImage(allPrintingTask);

	// allPrintingTask = [];

	// console.log(allPrintingTask);
}

function removeAllFiles() {
	fs.readdir(`./labels`, (err, files) => {
		if (err) {
			console.error(`Unable to read directory: ${err.message}`);
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

module.exports = { printLabels };
