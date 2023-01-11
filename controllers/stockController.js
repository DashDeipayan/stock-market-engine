"use strict";
const config = require("../config");
const stockModel = require("../models/stocks");
const betterInterval = require("../helpers/betterInterval");

const addStocks = async (req, res, next) => {
	try {
		const { stockid, data, message } = await stockModel.addStocks(req.body);
		res.send({ stockid, data, message });
	} catch (error) {
		logger.error("Error in creating Tag", err);
		throw err;
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
		res.flushHeaders();
		new betterInterval(async () => {
			const { stocksArray, message } = await stockModel.getAllStocks();
			if (stocksArray.length === 0) {
				res.status(404).write(`data: ${JSON.stringify(message)}\n\n`);
			} else {
				res.write(`data: ${JSON.stringify(stocksArray)}\n\n`);
			}
		}, config.scheduleTime * 1000).start();
	} catch (err) {
		logger.error("Error in creating Tag", err);
		throw err;
	}
};

const getStockById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const { stock, message } = await stockModel.getStockById(id);
		if (!data.exists) {
			res.status(404).send({ message });
		} else {
			res.send({ stock, message });
		}
	} catch (err) {
		logger.error("Error in creating Tag", err);
		throw err;
	}
};

const updateStock = async (req, res, next) => {
	try {
		const stockId = req.params.id;
		const updatedData = req.body;
		const { id, data, message } = await stockModel.updateStock({
			stockId,
			updatedData,
		});

		res.send({ id, data, message });
	} catch (err) {
		logger.error("Error in creating Tag", err);
		throw err;
	}
};

const deleteStock = async (req, res, next) => {
	try {
		const stockId = req.params.id;
		const { id, message } = await stockModel.deleteStock(stockId);
		res.send({ id, message });
	} catch (err) {
		logger.error("Error in creating Tag", err);
		throw err;
	}
};

module.exports = {
	addStocks,
	getAllStocks,
	getStockById,
	updateStock,
	deleteStock,
};
