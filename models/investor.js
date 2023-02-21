const firebase = require("../db");
const fireStore = firebase.firestore();
const investorsModel = fireStore.collection("investors");

const addOrUpdateInvestor = async (investorData) => {
	try {
		const investor = await investorsModel
			.where("email", "==", investorData.email)
			.limit(1)
			.get();
		if (investor.empty) {
			investorData.balance = 10000;
			await investorsModel.add(investorData);
			return {
				isNewUser: true,
				id: investorData.id,
				message: "Investor added successfully",
			};
		}
		return {
			isNewUser: false,
			id: investorData.id,
			message: "Investor exists",
		};
	} catch (err) {
		throw err;
	}
};

module.exports = { addOrUpdateInvestor };
