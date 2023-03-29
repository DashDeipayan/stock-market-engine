"use strict";

const firebase = require("../db");
const InvestmentModel = require("../models/investment");
const fireStore = firebase.firestore();

const getInvestmentsByUserId = async (req, res, next) => {
	try {
		const userid = req.params.id;
		const { stocks, message } = await InvestmentModel.getInvestmentsByUserId(
			userid
		);
		if (stocks.length) {
			return res.json({
				message,
				stocks,
			});
		} else {
			return res.status(404).json({
				message,
			});
		}
	} catch (err) {
		throw err;
	}
};

module.exports = {
	getInvestmentsByUserId,
};
