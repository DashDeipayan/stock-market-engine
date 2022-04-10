const express = require("express");
const {
	addTransaction,
	getAllTransactions,
} = require("../controllers/transactionsController");

const router = express.Router();

router.post("/", addTransaction);
router.get("/", getAllTransactions);

module.exports = {
	routes: router,
};
