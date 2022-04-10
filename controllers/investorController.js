"use strict";
const firebase = require("../db");
const Investor = require("../models/investor");
const fireStore = firebase.firestore();

const addInvestor = async (req, res, next) => {
	try {
		const data = req.body;
		await fireStore.collection("investors").add(data);
		res.send("record saved successfully");
	} catch (err) {
		res.status(400).send(err.message);
	}
};

const getAllInvestors = async (req, res, next) => {
	try {
		const investors = await fireStore.collection("investors");
		const data = await investors.get();
		const investorsArray = [];
		if (data.empty) {
			res.status(404).send("No investors found");
		} else {
			data.forEach((doc) => {
				const investor = new Investor(
					doc.id,
					doc.data().username,
					doc.data().email,
					doc.data().balance,
					doc.data().transactions,
					doc.data().ownedStocks
				);
				investorsArray.push(investor);
			});
			res.send(investorsArray);
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
};

const getInvestorById = async (req, res, next) => {
	try {
		const id = req.params.id;
		const investor = await fireStore.collection("investors").doc(id);
		const data = await investor.get();
		if (!data.exists) {
			res.status(404).send("No investor found");
		} else {
			console.log(data.data());
			res.send(data.data());
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
};

const updateInvestor = async (req, res, next) => {
	try {
		const id = req.params.id;
		const data = req.query;
		await fireStore.collection("investors").doc(id).update(data);
		res.send("record updated successfully");
	} catch (err) {
		res.status(400).send(err.message);
	}
};

const deleteInvestor = async (req, res, next) => {
	try {
		const id = req.params.id;
		await fireStore.collection("investors").doc(id).delete();
		res.send("record deleted successfully");
	} catch (err) {
		res.status(400).send(err.message);
	}
};

module.exports = {
	addInvestor,
	getAllInvestors,
	getInvestorById,
	updateInvestor,
	deleteInvestor,
};
