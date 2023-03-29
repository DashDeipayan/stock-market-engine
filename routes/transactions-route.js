const express = require("express");
const {
	addTransaction,
	getAllTransactions,
	getTransactionById,
} = require("../controllers/transactionsController");

const router = express.Router();

router.post("/", addTransaction);
router.get("/", getAllTransactions);
router.get("/:id", getTransactionById);

module.exports = {
	routes: router,
};
