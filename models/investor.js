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
				data: investorData,
				message: "Investor added successfully",
			};
		}
		let data = {};
		investor.forEach((doc) => (data = { id: doc.id, ...doc.data() }));
		return {
			isNewUser: false,
			data,
			message: "Investor exists",
		};
	} catch (err) {
		throw err;
	}
};

module.exports = { addOrUpdateInvestor };
