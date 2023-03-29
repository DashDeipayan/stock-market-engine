const express = require("express");
const {
	addOrUpdateInvestor,
	getAllInvestors,
	getInvestorById,
	updateInvestor,
	deleteInvestor,
} = require("../controllers/investorController");

const router = express.Router();

router.post("/", addOrUpdateInvestor);
router.get("/", getAllInvestors);
router.get("/:id", getInvestorById);
router.put("/:id", updateInvestor);
router.delete("/:id", deleteInvestor);

module.exports = {
	routes: router,
};
