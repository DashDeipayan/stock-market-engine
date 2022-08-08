"use strict";
const firebase = require("../db");
const Stock = require("../models/stocks");
const fireStore = firebase.firestore();
const randomMovements = require("../helpers/randomMovements");

const addStocks = async (req, res, next) => {
	try {
		const data = req.body;
		await fireStore.collection("stocks").add(data);
		res.send("record saved successfully");
	} catch (error) {
		res.status(400).send(error.message);
	}
};

const getAllStocks = async (req, res, next) => {
	try {
		const headers = {
			"Content-Type": "text/event-stream; charset=utf-8",
			Connection: "keep-alive",
			"Cache-Control": "no-cache",
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Credentials": true,
			"Access-Control-Allow-Headers": "content-type",
		};
		res.writeHead(200, headers);
		// res.flushHeaders();
		setInterval(async () => {
			const stocks = await fireStore.collection("stocks");
			const data = await stocks.get();
			const stocksArray = [];
			if (data.empty) {
				res.status(404).write("No stocks found");
			} else {
				data.forEach((doc) => {
					const stock = new Stock(
						doc.id,
						doc.data().name,
						doc.data().symbol,
						doc.data().marketValue,
						doc.data().status
					);
					stocksArray.push(stock);
				});
				res.write(`data: ${JSON.stringify(stocksArray)}\n\n`);
			}
		}, 2000);
	} catch (error) {
		res.status(400).write(error.message);
	}
};

const getStockById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const stock = await fireStore.collection("students").doc(id);
		const data = await stock.get();
		if (!data.exists) {
			res.status(404).send("No stock found");
		} else {
			console.log(data.data());
			res.send(data.data());
		}
	} catch (error) {
		res.status(400).send(error.message);
	}
};

const updateStock = async (req, res, next) => {
	try {
		const id = req.params.id;
		const data = req.query;
		const stock = await fireStore.collection("students").doc(id);
		await stock.update({ ...data });

		res.send("number changed successfully");
	} catch (err) {
		res.status(400).send(err.message);
	}
};

const deleteStock = async (req, res, next) => {
	try {
		const id = req.params.id;
		await fireStore.collection("stocks").doc(id).delete();
		res.send("record deleted successfully");
	} catch (error) {
		res.status(400).send(error.message);
	}
};

const updateStocksMarketValue = async (req, res, next) => {
	try {
		const stocksData = await fireStore.collection("stocks").get();
		if (stocksData.empty) {
			res.status(404).send("No stocks found");
		} else {
			stocksData.forEach(async (stock) => {
				const newMarketValue = randomMovements();
				const oldMarketValue = parseFloat(stock.data().marketValue);
				const newMarketValueTotal = parseFloat(
					(oldMarketValue + newMarketValue).toFixed(2)
				);
				await fireStore
					.collection("stocks")
					.doc(stock.id)
					.update({ marketValue: newMarketValueTotal });
			});
			console.log("Stocks market value updated successfully");
		}
	} catch (err) {
		console.error(err.message);
	}
};

module.exports = {
	addStocks,
	getAllStocks,
	getStockById,
	updateStock,
	deleteStock,
	updateStocksMarketValue,
};
