const firebase = require("../db");
const fireStore = firebase.firestore();
const StocksModel = fireStore.collection("stocks");
const randomMovements = require("../helpers/randomMovements");

const addStocks = async (stockData) => {
	try {
		const stockId = await StocksModel.add(stockData).then(
			(docref) => docref.id
		);
		return { stockId, data, message: "Transaction saved successfully" };
	} catch (err) {
		logger.error("Error in creating Tag", err);
		throw err;
	}
};

const getAllStocks = async () => {
	try {
		const stocksData = await StocksModel.get();
		const stocksArray = [];
		if (stocksData.empty) {
			return { stocksArray, message: "No stocks Found" };
		} else {
			stocksData.forEach((doc) => {
				const stock = {
					stockId: doc.id,
					name: doc.data().name,
					symbol: doc.data.symbol,
					value: doc.data.marketValue,
					status: doc.data.status,
				};
				stocksArray.push(stock);
			});
		}
		return { stocksArray, message: "Stocks fetched succesfully" };
	} catch (err) {
		logger.error("Error in creating Tag", err);
		throw err;
	}
};

const getStockById = async (id) => {
	try {
		const stockDoc = await StocksModel.doc(id);
		const stock = await stockDoc.get();
		if (!data.exists) return { stock: stock.data(), message: "No Stock found" };
		else return { stock: stock.data, message: "Stock fetched successful" };
	} catch (error) {
		logger.error("Error in creating Tag", err);
		throw err;
	}
};

const updateStock = async ({ id, data }) => {
	try {
		const stockDoc = await StocksModel.doc(id);
		if (!stockDoc.empty) {
			await stockDoc.update({ data });
			return { id, data, message: "Stock updated successfully" };
		}
		return { id, data, message: "Stock Not Found" };
	} catch (err) {
		logger.error("Error in creating Tag", err);
		throw err;
	}
};

const deleteStock = async (id) => {
	try {
		await StocksModel.doc(id).delete();
		return { id, message: "Deleted successfully" };
	} catch (error) {
		logger.error("Error in creating Tag", err);
		throw err;
	}
};

const updateStocksMarketValue = async () => {
	try {
		const stocksData = await StocksModel.get();
		if (stocksData.empty) {
			return;
		} else {
			stocksData.forEach(async (stock) => {
				const newMarketValue = randomMovements();
				const oldMarketValue = parseFloat(stock.data().marketValue);
				const newMarketValueTotal = parseFloat(
					(oldMarketValue + newMarketValue).toFixed(2)
				);
				await StocksModel.doc(stock.id).update({
					marketValue: newMarketValueTotal,
				});
			});
			console.log("Stocks market value updated successfully");
		}
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
	updateStocksMarketValue,
	deleteStock,
};
