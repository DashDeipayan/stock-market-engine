"use strict";

const firebase = require("../db");
const TransactionsModel = require("../models/transactions");
const fireStore = firebase.firestore();

const addTransaction = async (req, res, next) => {
	try {
		const transactionData = req.body;
		transactionData.InvestorID = req.userData.id;
		transactionData.TransactionDate = fireStore.TimeStamp.fromDate(new Date());
		const { transactionId, message } = await TransactionsModel.addTransaction(
			transactionData
		);
		return res.json({
			message,
			transactionId,
			data: {
				transactionData,
			},
		});
	} catch (err) {
		logger.error("Error in creating Tag", err);
		throw err;
	}
};
const getAllTransactions = async (req, res, next) => {
	try {
		const { allTransactions, message } =
			await TransactionsModel.getAllTransactions();
		if (allTransactions) {
			return res.json({ message, transactions: allTransactions });
		} else {
			return res.json({ message });
		}
	} catch (err) {
		logger.error("Error in creating Tag", err);
		throw err;
	}
};

const getTransactionById = async (req, res, next) => {
	try {
		const transactionid = req.params.id;
		const { transactionData, message } =
			await TransactionsModel.getTransactionById(transactionid);
		if (transactionid) {
			return res.json({
				message,
				data: transactionData,
			});
		} else {
			return res.status(404).json({
				message,
			});
		}
	} catch (err) {
		logger.error("Error in creating Tag", err);
		throw err;
	}
};

module.exports = {
	addTransaction,
	getAllTransactions,
	getTransactionById,
};
