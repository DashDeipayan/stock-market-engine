"use strict";
const firebase = require("../db");
const fireStore = firebase.firestore();
const purchase = require("../models/purchase");

const buyStock = async (req, res, next) => {
	try {
		const purchaseData = req.body;
		// purchaseData.investorId = req.userData.id;
		purchaseData.purchaseDate = new Date().toUTCString();
		const { transactionId, message, data } = await purchase.buyStock(
			purchaseData
		);
		return res.json({
			message,
			transactionId,
			data,
		});
	} catch (err) {
		throw err;
	}
};

const sellStock = async (req, res, next) => {
	try {
		const sellData = req.body;
		sellData.investorId = req.userData.id;
		sellData.purchaseDate = fireStore.TimeStamp.fromDate(new Date());
		const { transactionId, message, data } = await purchase.sellStock(sellData);
		return res.json({
			message,
			transactionId,
			data,
		});
	} catch (err) {
		logger.error("Error in creating Tag", err);
		throw err;
	}
};
module.exports = {
	buyStock,
	sellStock,
};
