const express = require("express");
const {
	addInvestor,
	getAllInvestors,
	getInvestorById,
	updateInvestor,
	deleteInvestor,
} = require("../controllers/investorController");

const router = express.Router();

router.post("/", addInvestor);
router.get("/", getAllInvestors);
router.get("/:id", getInvestorById);
router.put("/:id", updateInvestor);
router.delete("/:id", deleteInvestor);

module.exports = {
	routes: router,
};
