const firebase = require("../db");
const fireStore = firebase.firestore();
const InvestmentsModel = fireStore.collection("investments");

const getInvestmentsByUserId = async (investorId) => {
	try {
		const stockDocs = await InvestmentsModel.where(
			"investorId",
			"==",
			investorId
		).get();
		const allInvestmentsOfUser = [];
		if (stockDocs.empty) return { stocks: [], message: "No Stock found" };
		else {
			stockDocs.forEach((doc) => {
				const item = {
					id: doc.id,
					...doc.data(),
				};
				allInvestmentsOfUser.push(item);
			});
		}
		return {
			stocks: allInvestmentsOfUser,
			message: "Stock fetched successful",
		};
	} catch (error) {
		logger.error("Error in creating Tag", err);
		throw err;
	}
};

module.exports = { getInvestmentsByUserId };
