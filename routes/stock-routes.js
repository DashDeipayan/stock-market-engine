const express = require("express");
const {
	addStocks,
	getAllStocks,
	getStockById,
	updateStock,
	deleteStock,
	updateStocksMarketValue,
} = require("../controllers/stockController");

const router = express.Router();

router.post("/", addStocks);
router.get("/", getAllStocks);
router.get("/:id", getStockById);
router.put("/:id", updateStock);
router.put("/", updateStocksMarketValue);
router.delete("/:id", deleteStock);

module.exports = {
	routes: router,
};
