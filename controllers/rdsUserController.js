"use strict";
const firebase = require("../db");
const Investor = require("../models/investor");
const fireStore = firebase.firestore();

const getInvestorByRdsId = async (req, res, next) => {
	try {
		const id = req.params.id;
		const investor = await fireStore
			.collection("investors")
			.where("rdsId", "==", id)
			.get();
		let data;
		investor.forEach((doc) => {
			data = doc.data();
		});
		if (!data) {
			res.status(404).send("No investor found");
		} else {
			res.send(data);
		}
	} catch (err) {
		res.status(400).send(err.message);
	}
};

const addInvestorByRdsId = async (req, res, next) => {
	try {
		const id = req.body.id;
		const username = req.body.username;
		const email = req.body.email;

		const investor = await fireStore
			.collection("investors")
			.where("rdsId", "==", id)
			.get();
		let oldUser;
		investor.forEach((doc) => {
			oldUser = doc.data();
		});
		if (oldUser) {
			res.status(400).send("Already investor found");
			return;
		}

		let data = new Investor(id, username, email, "10000", [], []);
		const rdsId = data.id;
		delete data.id;
		data.rdsId = rdsId;
		await fireStore
			.collection("investors")
			.doc(id)
			.set(Object.assign({}, data));

		res.send("Added Investor Successfully");
	} catch (err) {
		res.status(400).send(err.message);
	}
};

module.exports = {
	getInvestorByRdsId,
	addInvestorByRdsId,
};
