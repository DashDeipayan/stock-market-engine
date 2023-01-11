"use strict";
const firebase = require("../db");
const fireStore = firebase.firestore();
const BuyOrSellStock = require("../models/buyOrSellStock");

const buyStock = async (req, res, next) => {
	try {
		const purchaseData = req.body;
		purchaseData.investorId = req.userData.id;
		purchaseData.purchaseDate = fireStore.TimeStamp.fromDate(new Date());
		const { transactionId, message, data } = await BuyOrSellStock.buyStock(
			purchaseData
		);
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

const sellStock = async (req, res, next) => {
	try {
		const sellData = req.body;
		sellData.investorId = req.userData.id;
		sellData.purchaseDate = fireStore.TimeStamp.fromDate(new Date());
		const { transactionId, message, data } = await BuyOrSellStock.sellStock(
			sellData
		);
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
