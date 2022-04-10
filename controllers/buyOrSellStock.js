"use strict";
const firebase = require("../db");
const fireStore = firebase.firestore();

const buyStock = async (req, res, next) => {
	try {
		//get investor id
		const investorId = req.query.investorId;

		//get stock id
		const stockId = req.query.stockId;

		//get stock data
		const stock = await fireStore.collection("stocks").doc(stockId);
		const stockData = await stock.get();

		//get investor data
		const investor = await fireStore.collection("investors").doc(investorId);
		const investorData = await investor.get();
		console.log(stockData.data());

		const purchaseValue =
			stockData.data().marketValue * (req.query.quantity || 1);

		const newBalance = investorData.data().balance - purchaseValue;

		let transactionData = {};
		transactionData.StockSymbol = stockData.data().symbol;
		transactionData.StockId = stockId;
		transactionData.InvestorID = investorId;
		transactionData.TransactionValue = purchaseValue;
		transactionData.TransactionType = "Buy";
		transactionData.TransactionDate = new Date().toISOString();
		const transactionId = await fireStore
			.collection("transactions")
			.add(transactionData)
			.then((docRef) => {
				return docRef.id;
			});
		transactionData.transactionId = transactionId;

		let newTransactions = investorData.data().transactions;
		newTransactions.push(transactionData);

		let newOwnedStocks = investorData.data().ownedStocks;

		let boughtStock = newOwnedStocks.find((stock) => stock.stockId === stockId);

		if (boughtStock) {
			let newQuantity =
				parseFloat(boughtStock.stockQuantity || 0) +
				parseFloat(req.query.quantity || 1);
			boughtStock.stockQuantity = newQuantity;
		} else {
			boughtStock = {};
			boughtStock.stockName = stockData.data().name;
			boughtStock.stockId = stockId;
			boughtStock.stockQuantity = req.query.quantity || 1;
		}

		newOwnedStocks = newOwnedStocks.filter(
			(stock) => stock.stockId !== stockId
		);
		newOwnedStocks.push(boughtStock);

		await fireStore.collection("investors").doc(investorId).update({
			balance: newBalance,
			ownedStocks: newOwnedStocks,
			transactions: newTransactions,
		});

		res.send(`stock bought successfully with transactionId=${transactionId}`);
	} catch (err) {
		res.status(400).send(err.message);
	}
};

const sellStock = async (req, res, next) => {
	try {
		const investorId = req.query.investorId;

		//get stock id
		const stockId = req.query.stockId;

		//get stock data
		const stock = await fireStore.collection("stocks").doc(stockId);
		const stockData = await stock.get();

		//get investor data
		const investor = await fireStore.collection("investors").doc(investorId);
		const investorData = await investor.get();

		const sellValue = stockData.data().marketValue * (req.query.quantity || 1);

		const newBalance = investorData.data().balance + sellValue;

		let transactionData = {};
		transactionData.StockSymbol = stockData.data().symbol;
		transactionData.StockId = stockId;
		transactionData.InvestorID = investorId;
		transactionData.TransactionValue = sellValue;
		transactionData.TransactionType = "Sell";
		transactionData.TransactionDate = new Date().toISOString();
		const transactionId = await fireStore
			.collection("transactions")
			.add(transactionData)
			.then((docRef) => {
				return docRef.id;
			});
		transactionData.transactionId = transactionId;

		let newTransactions = investorData.data().transactions;
		newTransactions.push(transactionData);

		let newOwnedStocks = investorData.data().ownedStocks;
		let sellStock = newOwnedStocks.find((stock) => stock.stockId === stockId);

		let newQuantity =
			parseFloat(sellStock.stockQuantity || 0) -
			parseFloat(req.query.quantity || 1);
		sellStock.stockQuantity = newQuantity;

		newOwnedStocks = newOwnedStocks.filter(
			(stock) => stock.stockId !== stockId
		);
		if (sellStock.stockQuantity >= 0) {
			newOwnedStocks.push(sellStock);
		}

		await fireStore.collection("investors").doc(investorId).update({
			balance: newBalance,
			ownedStocks: newOwnedStocks,
			transactions: newTransactions,
		});

		res.send(`stock sold successfully with transactionId=${transactionId}`);
	} catch (err) {
		res.status(400).send(err.message);
	}
};
module.exports = {
	buyStock,
	sellStock,
};
