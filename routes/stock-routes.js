const express = require("express");
const {
	addStocks,
	getAllStocks,
	getStockById,
	updateStock,
	deleteStock,
} = require("../controllers/stockController");

const router = express.Router();

router.post("/", addStocks);
router.get("/", getAllStocks);
router.get("/:id", getStockById);
router.put("/:id", updateStock);
router.delete("/:id", deleteStock);

module.exports = {
	routes: router,
};
