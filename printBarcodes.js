var edge = require("edge-js");

var printlabel;
var clearbuffer;
var barcode;
var setup;
var closeport;
var openport;
var windowsfont;
var sendcommand;

var fileSize = {
	width: "50",
	height: "60",
	speed: "12.0",
	density: "5",
};

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

try {
	sendcommand = edge.func({
		assemblyFile: "tsclibnet.dll",
		typeName: "TSCSDK.node_usb",
		methodName: "sendcommand",
	});
} catch (error) {
	console.log(error);
}

// try {
// 	about = edge.func({
// 		assemblyFile: "tsclibnet.dll",
// 		typeName: "TSCSDK.node_usb",
// 		methodName: "about",
// 	});
// } catch (error) {
// 	console.log(error);
// }

// try {
// 	printerfont = edge.func({
// 		assemblyFile: "tsclibnet.dll",
// 		typeName: "TSCSDK.node_usb",
// 		methodName: "printerfont",
// 	});
// } catch (error) {
// 	console.log(error);
// }

// try {
// 	printerfile = edge.func({
// 		assemblyFile: "tsclibnet.dll",
// 		typeName: "TSCSDK.node_usb",
// 		methodName: "printerfile",
// 	});
// } catch (error) {
// 	console.log(error);
// }

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
// 	sendcommand_utf8 = edge.func({
// 		assemblyFile: "tsclibnet.dll",
// 		typeName: "TSCSDK.node_usb",
// 		methodName: "sendcommand_utf8",
// 	});
// } catch (error) {
// 	console.log(error);
// }

// try {
// 	sendcommand_binary = edge.func({
// 		assemblyFile: "tsclibnet.dll",
// 		typeName: "TSCSDK.node_usb",
// 		methodName: "sendcommand_binary",
// 	});
// } catch (error) {
// 	console.log(error);
// }

// try {
// 	downloadFile = edge.func({
// 		assemblyFile: "tsclibnet.dll",
// 		typeName: "TSCSDK.node_usb",
// 		methodName: "downloadfile",
// 	});
// } catch (error) {
// 	console.log(error);
// }

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

async function sendCommandMod(command) {
	try {
		await sendcommand(command);
	} catch (error) {
		console.log(error);
	}
}

async function printBarcode(items) {
	console.log(items);

	for (const item of items) {
		var productName_variable = {
			x: 390,
			y: 470,
			fontheight: 30,
			fontstyle: 2,
			fontunderline: 0,
			szFaceName: "Arial",
			rotation: 180,
			content: `${item?.itemName}`,
		};

		var barcode_variable = {
			x: "390",
			y: "430",
			type: "128",
			height: "50",
			readable: "1",
			rotation: "180deg",
			narrow: "2",
			wide: "2",
			code: "01245383",
		};

		var customerFSSAI_variable = {
			x: 250,
			y: 370,
			fontheight: 20,
			fontstyle: 0,
			fontunderline: 0,
			szFaceName: "Arial",
			rotation: 180,
			content: "FSSAI NO. 1132198462374",
		};

		var customerNameField_variable = {
			x: 396,
			y: 340,
			fontheight: 20,
			fontstyle: 0,
			fontunderline: 0,
			szFaceName: "Arial",
			rotation: 180,
			content: "Marketed By: Shree Ashapura Grain Store",
		};

		// var customerNameValue_variable = {
		// 	x: 285,
		// 	y: 340,
		// 	fontheight: 20,
		// 	fontstyle: 0,
		// 	fontunderline: 0,
		// 	szFaceName: "Arial",
		// 	rotation: 180,
		// 	content: "Shree Ashapura Grain Store",
		// };

		var customerAddress1_variable = {
			x: 396,
			y: 320,
			fontheight: 20,
			fontstyle: 0,
			fontunderline: 0,
			szFaceName: "Arial",
			rotation: 180,
			content: "Shop No 18 Plot No. 26 Alankar",
		};

		var customerAddress2_variable = {
			x: 396,
			y: 300,
			fontheight: 20,
			fontstyle: 0,
			fontunderline: 0,
			szFaceName: "Arial",
			rotation: 180,
			content: "Shopping Center N N P 344 East",
		};

		var customerCareField_variable = {
			x: 30,
			y: 280,
			fontheight: 20,
			fontstyle: 0,
			fontunderline: 0,
			szFaceName: "Arial",
			rotation: 90,
			content: "Cust. Care: 9820454545",
		};

		var customerEmailField_variable = {
			x: 10,
			y: 300,
			fontheight: 21,
			fontstyle: 0,
			fontunderline: 0,
			szFaceName: "Arial",
			rotation: 90,
			content: "ashapuragrain@gmail.com",
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

		// var PackedOnValue_variable = {
		// 	x: 290,
		// 	y: 270,
		// 	fontheight: 20,
		// 	fontstyle: 0,
		// 	fontunderline: 0,
		// 	szFaceName: "Arial",
		// 	rotation: 180,
		// 	content: "01/03/2024",
		// };

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

		// var BestBeforeValue_variable = {
		// 	x: 290,
		// 	y: 240,
		// 	fontheight: 20,
		// 	fontstyle: 0,
		// 	fontunderline: 0,
		// 	szFaceName: "Arial",
		// 	rotation: 180,
		// 	content: "01/05/2024",
		// };

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

		// var mrpValue_variable = {
		// 	x: 300,
		// 	y: 215,
		// 	fontheight: 25,
		// 	fontstyle: 0,
		// 	fontunderline: 0,
		// 	szFaceName: "Arial",
		// 	rotation: 180,
		// 	content: `${item?.mrp}`,
		// };

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

		// var pergramValue_variable = {
		// 	x: 130,
		// 	y: 190,
		// 	fontheight: 20,
		// 	fontstyle: 0,
		// 	fontunderline: 0,
		// 	szFaceName: "Arial",
		// 	rotation: 180,
		// 	content: "0.15",
		// };

		var rrpField_variable = {
			x: 396,
			y: 182,
			fontheight: 23,
			fontstyle: 2,
			fontunderline: 0,
			szFaceName: "Arial",
			rotation: 180,
			content: `R.R.P.:  Rs. ${item?.rrp}`,
		};

		// var rrpValue_variable = {
		// 	x: 300,
		// 	y: 190,
		// 	fontheight: 25,
		// 	fontstyle: 0,
		// 	fontunderline: 0,
		// 	szFaceName: "Arial",
		// 	rotation: 180,
		// 	content: `${item?.rrp}`,
		// };

		var netQuantityField_variable = {
			x: 396,
			y: 154,
			fontheight: 22,
			fontstyle: 2,
			fontunderline: 0,
			szFaceName: "Arial",
			rotation: 180,
			content: `Net Qty: ${item?.sku}`,
		};

		// var netQuantityValue_variable = {
		// 	x: 300,
		// 	y: 160,
		// 	fontheight: 20,
		// 	fontstyle: 0,
		// 	fontunderline: 0,
		// 	szFaceName: "Arial",
		// 	rotation: 180,
		// 	content: `${item?.sku}`,
		// };

		var lotNoField_variable = {
			x: 396,
			y: 124,
			fontheight: 22,
			fontstyle: 2,
			fontunderline: 0,
			szFaceName: "Arial",
			rotation: 180,
			content: "Lot No.: B-43",
		};

		// var lotNoValue_variable = {
		// 	x: 300,
		// 	y: 130,
		// 	fontheight: 20,
		// 	fontstyle: 0,
		// 	fontunderline: 0,
		// 	szFaceName: "Arial",
		// 	rotation: 180,
		// 	content: "B-43",
		// };

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
			content: "G-25, Sidhpura Industrial Estate,",
		};

		var companyAddress2_variable = {
			x: 396,
			y: 50,
			fontheight: 20,
			fontstyle: 0,
			fontunderline: 0,
			szFaceName: "Arial",
			rotation: 180,
			content:
				"Gaiwadi Rd S.V. Road, Goregoan West 400104.",
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

		try {
			await Promise.all([
				openPortMod(""),
				// setupMod(fileSize),
				setupMod("50", "60", "12.0", "7"),
				clearBufferMod(""),
				windowsfontMod(productName_variable),
				barcodeMod(barcode_variable),
				windowsfontMod(customerFSSAI_variable),
				windowsfontMod(customerNameField_variable),
				windowsfontMod(customerAddress1_variable),
				windowsfontMod(customerAddress2_variable),
				windowsfontMod(customerCareField_variable),
				windowsfontMod(customerEmailField_variable),
				windowsfontMod(PackedOnField_variable),
				windowsfontMod(BestBeforeField_variable),
				windowsfontMod(mrpField_variable),
				windowsfontMod(incAllTaxField_variable),
				windowsfontMod(pergramField_variable),
				windowsfontMod(rrpField_variable),
				windowsfontMod(netQuantityField_variable),
				windowsfontMod(lotNoField_variable),
				windowsfontMod(companyName_variable),
				windowsfontMod(companyAddress1_variable),
				windowsfontMod(companyAddress2_variable),
				windowsfontMod(companyFssai_variable),

				printLabelMod(label_variable),
				// clearBufferMod(""),
			]);

			// OPEN PORT FOR PRINTING
			// await openPortMod("");

			// await setupMod(fileSize);

			// await clearBufferMod("");

			// await windowsfontMod(productName_variable);

			// await barcodeMod(barcode_variable);

			// await windowsfontMod(customerFSSAI_variable);
			// await windowsfontMod(customerNameField_variable);
			// await windowsfontMod(customerNameValue_variable);
			// await windowsfontMod(customerAddress1_variable);
			// await windowsfontMod(customerAddress2_variable);

			// await windowsfontMod(customerCareField_variable);
			// await windowsfontMod(customerEmailField_variable);

			// await windowsfontMod(PackedOnField_variable);
			// await windowsfontMod(PackedOnValue_variable);

			// await windowsfontMod(BestBeforeField_variable);
			// await windowsfontMod(BestBeforeValue_variable);

			// await windowsfontMod(mrpField_variable);
			// await windowsfontMod(mrpValue_variable);

			// await windowsfontMod(incAllTaxField_variable);

			// await windowsfontMod(pergramField_variable);
			// await windowsfontMod(pergramValue_variable);

			// await windowsfontMod(rrpField_variable);
			// await windowsfontMod(rrpValue_variable);

			// await windowsfontMod(netQuantityField_variable);
			// await windowsfontMod(netQuantityValue_variable);

			// await windowsfontMod(lotNoField_variable);
			// await windowsfontMod(lotNoValue_variable);

			// await windowsfontMod(companyName_variable);
			// await windowsfontMod(companyAddress1_variable);
			// await windowsfontMod(companyAddress2_variable);
			// await windowsfontMod(companyFssai_variable);

			// await printLabelMod(label_variable);

			// await clearBufferMod("");
		} catch (error) {
			console.log(error);
		} finally {
			// await clearBufferMod("");

			// Always attempt to close the port
			await closePortMod();
		}
	}
}

async function printBarcodeSendCMD(items) {
	console.log(items);
	try {
		for (const item of items) {
			await Promise.all([
				openPortMod(""),
				sendCommandMod("SIZE 50 mm,60 mm"),
				sendCommandMod("DIRECTION 1,0"),
				sendCommandMod("DENSITY 4"),
				sendCommandMod("SPEED 12"),
				sendCommandMod("CLS"),
				sendCommandMod(
					`TEXT 18,18,\"3.EFT\",0,0,1.5,\"${item?.itemName}\"`
				),
				sendCommandMod(
					`BARCODE 28,45, \"128\",30,1,0,3,7,\"${item?.barCode}\"`
				),

				sendCommandMod(
					`TEXT 18,110,\"2.EFT\",0,0,0,\"Marketed By:Ashapura General Store\"`
				),
				sendCommandMod(
					`TEXT 18,130,\"2.EFT\",0,0,0,\"Shop No 18 Plot No. 26 Alankar\"`
				),
				sendCommandMod(
					`TEXT 18,150,\"2.EFT\",0,0,0,\"Shopping Center N N P 344 East\"`
				),
				sendCommandMod(
					`TEXT 300,150,\"2.EFT\",0,90,0,\"Cust. Care: 9999 44555\"`
				),
				sendCommandMod(
					`TEXT 18,170,\"2.EFT\",0,0,0,\"FSSAI NO. 115200054000\"`
				),

				sendCommandMod(
					`TEXT 18,200,\"3.EFT\",0,0.5,0,\"Packed On:   10/03/2024\"`
				),
				sendCommandMod(
					`TEXT 18,230,\"3.EFT\",0,0.5,0,\"Best Before: 10/4/2024\"`
				),

				sendCommandMod(
					`TEXT 18,260,\"3.EFT\",0,0.5,0,\"Net Qty:  ${item?.sku}\"`
				),
				sendCommandMod(
					`TEXT 18,290,\"3.EFT\",0,0.5,0,\"Lot No:   B-677\"`
				),

				sendCommandMod(
					`TEXT 18,320,\"3.EFT\",0,0.5,0,\"M.R.P: Rs. ${item?.mrp}/-\"`
				),
				sendCommandMod(
					'TEXT 230,300,"1",0,0,0,"Incl. All Taxes"'
				),
				sendCommandMod(
					'TEXT 230,330,"1",0,0,0,"0.15 Per gm"'
				),
				sendCommandMod(
					`TEXT 18,350,\"3.EFT\",0,0.5,0,\"R.R.P: Rs. ${item?.rrp}/-\"`
				),
				sendCommandMod(
					`TEXT 18,380,\"2.EFT\",0,0,0,\"Packed By:P.R.P.M Services Pvt Ltd\"`
				),

				sendCommandMod(
					`TEXT 18,400,\"2.EFT\",0,0,0,\"G-25, Sidhpura Industrial Estate,\"`
				),

				sendCommandMod(
					`TEXT 18,420,\"2.EFT\",0,0,0,\"Gaiwadi Rd S.V. Road\"`
				),

				sendCommandMod(
					`TEXT 18,440,\"2.EFT\",0,0,0,\"Goregoan West 400104\"`
				),
				sendCommandMod(
					`TEXT 18,460,\"2.EFT\",0,0,0,\"FSSAI NO. 115200054000\"`
				),

				sendCommandMod(`PRINT ${item?.quantity},1`),
			]);
		}
	} catch (error) {
		console.log(error);
	} finally {
		await sendCommandMod("CUT");
		await closePortMod("");
	}
}

module.exports = {
	printBarcodeSendCMD,
	printBarcode,
	openPortMod,
	closePortMod,
};
