const firebase = require("../db");
const fireStore = firebase.firestore();
const stocksModel = fireStore.collection("stocks");
const investorModel = fireStore.collection("investors");
const investmentsModel = fireStore.collection("investments");
const transactionModel = fireStore.collection("transactions");

const buyStock = async (data) => {
	try {
		const { stockId, investorId, quantity, price, purchaseDate } = data;
		const stock = await stocksModel.doc(stockId);
		const stockData = await stock.get();

		const investorData = await investorModel
			.where("investorId", "==", investorId)
			.limit(1)
			.get();
		const investor = [];
		investorData.forEach((doc) => {
			const item = { id: doc.id, ...doc.data() };
			investor.push(item);
		});

		const purchaseValue = parseFloat(price) * (data.quantity || 0);
		const newBalance = investor[0].balance - purchaseValue;

		await investorModel.doc(investor[0].id).update({ balance: newBalance });

		const userInvestment = await investmentsModel
			.where("investorId", "==", investorId)
			.where("stockId", "==", stockId)
			.get();
		if (!userInvestment.empty) {
			const userInvestmentData = [];
			userInvestment.forEach((doc) => {
				const item = { id: doc.id, ...doc.data() };
				userInvestmentData.push(item);
			});
			const newQuantity =
				parseFloat(userInvestmentData[0].stockQuantity) + parseFloat(quantity);
			const userInvestmentDoc = await investmentsModel.doc(
				userInvestmentData[0].id
			);
			await userInvestmentDoc.update({ stockQuantity: newQuantity });
		} else {
			await investmentsModel.add({
				stockQuantity: parseFloat(quantity),
				investorId,
				stockId,
			});
		}
		const transactionData = {
			StockSymbol: stockData.data().symbol,
			StockId: stockId,
			InvestorID: investorId,
			TransactionValue: purchaseValue,
			TransactionType: "Buy",
			TransactionDate: purchaseDate,
		};
		const transactionId = await transactionModel
			.add(transactionData)
			.then((docRef) => {
				return docRef.id;
			});
		return {
			transactionId,
			message: "Stock purchase Success",
			data: { stockId, purchaseValue, stockQuantity: quantity },
		};
	} catch (err) {
		throw err;
	}
};

const sellStock = async (data) => {
	try {
		const { stockId, investorId, quantity, price, purchaseDate } = data;
		const stock = await stocksModel.doc(stockId);
		const stockData = await stock.get();

		const investorData = await investorModel
			.where("investorId", "==", investorId)
			.limit(1)
			.get();
		const investor = [];
		investorData.forEach((doc) => {
			const item = { id: doc.id, ...doc.data() };
			investor.push(item);
		});

		const sellValue = price * (data.quantity || 0);
		const newBalance = investor[0].balance + sellValue;

		await investorModel.doc(investor[0].id).update({ balance: newBalance });

		const userInvestment = await investmentsModel
			.where("investorId", "==", investorId)
			.where("stockId", "==", stockId)
			.get();

		const userInvestmentData = [];
		userInvestment.forEach((doc) => {
			const item = { id: doc.id, ...doc.data() };
			userInvestmentData.push(item);
		});
		const userInvestmentDoc = await investmentsModel
			.doc(userInvestmentData[0].id)
			.get()
			.then((docref) => docref.data());
		if (userInvestmentDoc.stockQuantity === parseFloat(quantity)) {
			await investmentsModel.doc(userInvestmentData[0].id).delete();
		} else {
			const newQuantity =
				parseFloat(userInvestmentDoc.stockQuantity) - parseFloat(quantity);
			await investmentsModel.doc(userInvestmentData[0].id).update({
				stockQuantity: newQuantity,
			});
		}
		const transactionData = {
			StockSymbol: stockData.data().symbol,
			StockId: stockId,
			InvestorID: investorId,
			TransactionValue: sellValue,
			TransactionType: "Sell",
			TransactionDate: purchaseDate,
		};
		const transactionId = await transactionModel
			.add(transactionData)
			.then((docRef) => {
				return docRef.id;
			});
		return {
			transactionId,
			message: "Stock sell Success",
			data: { stockId, sellValue, stockQuantity: quantity },
		};
	} catch (err) {
		throw err;
	}
};

module.exports = {
	buyStock,
	sellStock,
};
