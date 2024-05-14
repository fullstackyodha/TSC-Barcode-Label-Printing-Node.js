var edge = require("edge-js");

var printlabel;
var clearbuffer;
var barcode;
var setup;
var closeport;
var openport;
var windowsfont;

try {
	openport = edge.func({
		assemblyFile: "tsclibnet.dll",
		typeName: "TSCSDK.node_usb",
		methodName: "openport",
	});
} catch (error) {
	console.log(error);
}

try {
	clearbuffer = edge.func({
		assemblyFile: "tsclibnet.dll",
		typeName: "TSCSDK.node_usb",
		methodName: "clearbuffer",
	});
} catch (error) {
	console.log(error);
}

try {
	barcode = edge.func({
		assemblyFile: "tsclibnet.dll",
		typeName: "TSCSDK.node_usb",
		methodName: "barcode",
	});
} catch (error) {
	console.log(error);
}

try {
	setup = edge.func({
		assemblyFile: "tsclibnet.dll",
		typeName: "TSCSDK.node_usb",
		methodName: "setup",
	});
} catch (error) {
	console.log(error);
}

try {
	closeport = edge.func({
		assemblyFile: "tsclibnet.dll",
		typeName: "TSCSDK.node_usb",
		methodName: "closeport",
	});
} catch (error) {
	console.log(error);
}

try {
	windowsfont = edge.func({
		assemblyFile: "tsclibnet.dll",
		typeName: "TSCSDK.node_usb",
		methodName: "windowsfont",
	});
} catch (error) {
	console.log(error);
}

try {
	printlabel = edge.func({
		assemblyFile: "tsclibnet.dll",
		typeName: "TSCSDK.node_usb",
		methodName: "printlabel",
	});
} catch (error) {
	console.log(error);
}

async function setupMod(fileSize) {
	try {
		await setup(fileSize);
	} catch (error) {
		console.log(error);
	}
}

async function clearBufferMod() {
	try {
		await clearbuffer("");
	} catch (error) {
		console.log(error);
	}
}

async function closePortMod() {
	try {
		await closeport("");
	} catch (error) {
		console.log(error);
	}
}

async function openPortMod() {
	try {
		await openport("");
	} catch (error) {
		console.log(error);
	}
}

async function barcodeMod(barcode_variable) {
	try {
		await barcode(barcode_variable);
	} catch (error) {
		console.log(error);
	}
}

async function windowsfontMod(customerNameValue_variable) {
	try {
		await windowsfont(customerNameValue_variable);
	} catch (error) {
		console.log(error);
	}
}

async function printLabelMod(label_variable) {
	try {
		await printlabel(label_variable);
	} catch (error) {
		console.log(error);
	}
}

async function printBarcode(items) {
	try {
		let allPrintingTask = [];

		await openPortMod("");
		await setupMod("50", "60", "12.0", "7");
		await clearBufferMod("");

		// CREATE ALL PRINITNG TASK
		for (const item of items) {
			// CREATE THE ARRAY OF OBJECTS TO BE PRINTED AT ONCE
			allPrintingTask.push(createLabelData(item));
		}

		// GIVE COMMAND TO PRINT
		for (const task of allPrintingTask) {
			await clearBufferMod("");

			for (const [key, value] of Object.entries(task)) {
				// IF KEY IS BARCODE
				if (key === "barcode") {
					await barcodeMod(value);
				}
				// IF KEY IS PRINT
				else if (key === "print") {
					await printLabelMod(value);
				}
				// ELSE WINDOWS FONT
				else {
					await windowsfontMod(value);
				}
			}
		}
	} catch (error) {
		console.log(error);
	} finally {
		await clearBufferMod("");
		// // Always attempt to close the port
		await closePortMod();
	}
}

// CREATES LABEL DATA OBJECT
function createLabelData(item) {
	var productName_variable = {
		x: 390,
		y: 470,
		fontheight: 26,
		fontstyle: 2,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 180,
		content: `${item?.itemName}`,
	};

	var barcode_variable = {
		x: "390",
		y: "440",
		type: "128",
		height: "45",
		readable: "1",
		rotation: "180deg",
		narrow: "2",
		wide: "2",
		code: `${item?.barCode}`,
	};

	var customerFSSAI_variable = {
		x: 240,
		y: 385,
		fontheight: 20,
		fontstyle: 0,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 180,
		content: `FSSAI NO. ${item?.fssaiNo}`,
	};

	var customerNameField_variable = {
		x: 396,
		y: 360,
		fontheight: 20,
		fontstyle: 0,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 180,
		content: `Marketed By: ${item?.storeName}`,
	};

	var customerAddress1_variable = {
		x: 396,
		y: 340,
		fontheight: 20,
		fontstyle: 0,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 180,
		content: `${item?.address1}`,
	};

	var customerAddress2_variable = {
		x: 396,
		y: 320,
		fontheight: 20,
		fontstyle: 0,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 180,
		content: `${item?.address2}`,
	};
	var customerEmailField_variable = {
		x: 396,
		y: 300,
		fontheight: 20,
		fontstyle: 0,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 180,
		content: `Email: ${item?.email}`,
	};

	var customerCareField_variable = {
		x: 10,
		y: 280,
		fontheight: 20,
		fontstyle: 0,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 90,
		content: `Cust. Care: ${item?.customerCare}`,
	};

	var PackedOnField_variable = {
		x: 396,
		y: 270,
		fontheight: 22,
		fontstyle: 2,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 180,
		content: "Packed On:  01/03/2024",
	};

	var BestBeforeField_variable = {
		x: 396,
		y: 240,
		fontheight: 22,
		fontstyle: 2,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 180,
		content: "Best Before:  01/05/2024",
	};

	var mrpField_variable = {
		x: 396,
		y: 210,
		fontheight: 23,
		fontstyle: 2,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 180,
		content: `M.R.P.:  Rs. ${item?.mrp}`,
	};

	var incAllTaxField_variable = {
		x: 190,
		y: 210,
		fontheight: 20,
		fontstyle: 0,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 180,
		content: "Incl. All Taxes",
	};

	var pergramField_variable = {
		x: 190,
		y: 190,
		fontheight: 20,
		fontstyle: 0,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 180,
		content: "0.15 per gm",
	};

	var rrpField_variable = {
		x: 396,
		y: 180,
		fontheight: 23,
		fontstyle: 2,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 180,
		content: `R.R.P.:  Rs. ${item?.rrp}`,
	};

	var netQuantityField_variable = {
		x: 396,
		y: 150,
		fontheight: 22,
		fontstyle: 2,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 180,
		content: `Net Qty: ${item?.sku}`,
	};

	var lotNoField_variable = {
		x: 396,
		y: 120,
		fontheight: 22,
		fontstyle: 2,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 180,
		content: "Lot No.: B-43",
	};

	var companyName_variable = {
		x: 396,
		y: 90,
		fontheight: 20,
		fontstyle: 2,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 180,
		content: "Packed By: PRPM Services Pvt Ltd",
	};

	var companyAddress1_variable = {
		x: 396,
		y: 70,
		fontheight: 20,
		fontstyle: 0,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 180,
		content: "G-25, Sidhpura Industrial Estate, Gaiwadi Rd",
	};

	var companyAddress2_variable = {
		x: 396,
		y: 50,
		fontheight: 20,
		fontstyle: 0,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 180,
		content: "S.V. Road, Goregoan West 400104.",
	};

	var companyFssai_variable = {
		x: 396,
		y: 30,
		fontheight: 20,
		fontstyle: 0,
		fontunderline: 0,
		szFaceName: "Arial",
		rotation: 180,
		content: "FSSAI NO. 115200054000",
	};

	var label_variable = {
		quantity: `${item?.quantity}`,
		copy: "1",
	};

	const labelData = {
		productName: productName_variable,
		barcode: barcode_variable,
		customerFSSAI: customerFSSAI_variable,
		customerName: customerNameField_variable,
		customerAddress1: customerAddress1_variable,
		customerAddress2: customerAddress2_variable,
		customerCareField: customerCareField_variable,
		customerEmailField: customerEmailField_variable,
		PackedOnField: PackedOnField_variable,
		BestBeforeField: BestBeforeField_variable,
		mrpField: mrpField_variable,
		incAllTaxField: incAllTaxField_variable,
		pergramField: pergramField_variable,
		rrpField: rrpField_variable,
		netQuantityField: netQuantityField_variable,
		lotNoField: lotNoField_variable,
		companyName: companyName_variable,
		companyAddress: companyAddress1_variable,
		companyAddress2: companyAddress2_variable,
		companyFssai: companyFssai_variable,

		print: label_variable,
	};

	return labelData;
}

module.exports = {
	printBarcode,
};

// try {
// 	printer_status = edge.func({
// 		assemblyFile: "tsclibnet.dll",
// 		typeName: "TSCSDK.node_usb",
// 		methodName: "printerstatus_string",
// 	});
// } catch (error) {
// 	console.log(error);
// }

// try {
// 	await Promise.all([
// 		clearBufferMod(""),
// 		windowsfontMod(productName_variable),
// 		barcodeMod(barcode_variable),
// 		windowsfontMod(customerFSSAI_variable),
// 		windowsfontMod(customerNameField_variable),
// 		windowsfontMod(customerAddress1_variable),
// 		windowsfontMod(customerAddress2_variable),
// 		windowsfontMod(customerCareField_variable),
// 		windowsfontMod(customerEmailField_variable),
// 		windowsfontMod(PackedOnField_variable),
// 		windowsfontMod(BestBeforeField_variable),
// 		windowsfontMod(mrpField_variable),
// 		windowsfontMod(incAllTaxField_variable),
// 		windowsfontMod(pergramField_variable),
// 		windowsfontMod(rrpField_variable),
// 		windowsfontMod(netQuantityField_variable),
// 		windowsfontMod(lotNoField_variable),
// 		windowsfontMod(companyName_variable),
// 		windowsfontMod(companyAddress1_variable),
// 		windowsfontMod(companyAddress2_variable),
// 		windowsfontMod(companyFssai_variable),

// 		printLabelMod(label_variable),
// 	]);
// } catch (error) {
// 	console.log(error);
// }
