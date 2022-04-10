"use strict";

const firebase = require("../db");
const Transaction = require("../models/transactions");
const fireStore = firebase.firestore();

const addTransaction = async (req, res, next) => {
	try {
		const data = req.body;
		await fireStore.collection("transactions").add(data);
		res.send("transaction saved successfully");
	} catch (error) {
		res.status(400).send(error.message);
	}
};
const getAllTransactions = async (req, res, next) => {
	try {
		const transactions = await fireStore.collection("transactions");
		const data = await transactions.get();
		const transactionsArray = [];
		if (data.empty) {
			res.status(404).send("No transaction found");
		} else {
			data.forEach((doc) => {
				const transaction = new Transaction(
					doc.id,
					doc.data().StockSymbol,
					doc.data().InvestorID,
					doc.data().StockId,
					doc.data().TransactionValue,
					doc.data().TransactionType,
					doc.data().TransactionDate
				);
				transactionsArray.push(transaction);
			});
			res.send(transactionsArray);
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
};

const purchaseOfStock = async (req, res, next) => {
	try {
		const id = req.query.id;
		const stock = await fireStore.collection("stocks").doc(id);
		const data = await stock.get();
	} catch (err) {
		res.status(400).send(err.message);
	}
};

module.exports = {
	addTransaction,
	getAllTransactions,
	purchaseOfStock,
};
