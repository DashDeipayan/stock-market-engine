const express = require("express");
const {
	getInvestmentsByUserId,
} = require("../controllers/investmentController");

const router = express.Router();

router.get("/:id", getInvestmentsByUserId);

module.exports = {
	routes: router,
};
