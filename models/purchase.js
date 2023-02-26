const firebase = require("../db");
const fireStore = firebase.firestore();
const stocksModel = fireStore.collection("stocks");
const investorModel = fireStore.collection("investors");
const investmentsModel = fireStore.collection("investments");
const transactionModel = fireStore.collection("transactions");

const buyStock = async (data) => {
	try {
		const { stockId, investorId, quantity, purchaseDate } = data;
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

		const purchaseValue = stockData.data().marketValue * (data.quantity || 1);
		const newBalance = investor[0].balance - purchaseValue;

		await investorModel.doc(investor[0].id).update({ balance: newBalance });

		const userInvestment = await investmentsModel
			.where("investorId", "==", investorId)
			.where("stockId", "==", stockId)
			.get();
		if (!userInvestment.empty) {
			const newQuantity =
				parseFloat(userInvestment.data().stockQuantity) + parseFloat(quantity);
			const userInvestmentDoc = await investmentsModel.doc(userInvestment.id);
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
		const { stockId, investorId, quantity, sellDate } = data;
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

		const sellValue = stockData.data().marketValue * (data.quantity || 1);
		const newBalance = investorData.data().balance + sellValue;

		await investorModel.doc(investor[0].id).update({ balance: newBalance });

		const userInvestment = await investmentsModel
			.where("investorId", "==", investorId)
			.where("stockId", "==", stockId)
			.get();
		const userInvestmentDoc = await investmentsModel.doc(userInvestment.id);
		if (userInvestmentDoc.stockQuantity === parseFloat(quantity)) {
			await investmentsModel.doc(userInvestment.id).delete();
		} else {
			const newQuantity =
				parseFloat(userInvestment.data().stockQuantity) - parseFloat(quantity);
			await investmentsModel.update({
				stockQuantity: newQuantity,
			});
		}
		const transactionData = {
			StockSymbol: stockData.data().symbol,
			StockId: stockId,
			InvestorID: investorId,
			TransactionValue: sellValue,
			TransactionType: "Sell",
			TransactionDate: sellDate,
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
		logger.error("Error in selling Stock", err);
		throw err;
	}
};

module.exports = {
	buyStock,
	sellStock,
};
