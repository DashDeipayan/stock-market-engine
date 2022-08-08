const express = require("express");
const {
	getInvestorByRdsId,
	addInvestorByRdsId,
} = require("../controllers/rdsUserController");

const router = express.Router();

router.get("/getInvestorByRdsId/:id", getInvestorByRdsId);
router.post("/addInvestorByRdsId", addInvestorByRdsId);

module.exports = {
	routes: router,
};
