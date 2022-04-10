const express = require("express");
const { buyStock, sellStock } = require("../controllers/buyOrSellStock");

const router = express.Router();

router.put("/buy", buyStock);
router.put("/sell", sellStock);

module.exports = {
	routes: router,
};
