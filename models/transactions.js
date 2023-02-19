const firebase = require("../db");
const fireStore = firebase.firestore();
const transactionsModel = fireStore.collection("transactions");

const addTransaction = async (transactionData) => {
	try {
		const transactionId = await transactionsModel
			.add(transactionData)
			.then((docref) => docref.id);
		return { transactionId, message: "Transaction saved successfully" };
	} catch (err) {
		logger.error("Error in creating Tag", err);
		throw err;
	}
};

const getAllTransactions = async () => {
	try {
		const transactions = await transactionsModel;
		const data = await transactions.get();
		const allTransactions = [];
		if (data.empty) {
			return { message: "No transactions found" };
		} else {
			data.forEach((doc) => {
				const transaction = {
					transactionid: doc.id,
					...doc.data(),
				};
				allTransactions.push(transaction);
			});
			return { allTransactions, message: "Transactions fetched successfully" };
		}
	} catch (err) {
		logger.error("Error in creating Tag", err);
		throw err;
	}
};

const getTransactionById = async (transactionId) => {
	try {
		const transaction = await transactionsModel
			.where("transactionsId", "==", transactionId)
			.get();
		if (transaction.empty) {
			return { message: "No transaction found" };
		}
		const transactionData = [];
		transaction.forEach((doc) => {
			const item = {
				id: doc.id,
				...doc.data(),
			};
			transactionData.push(item);
		});
		return { transactionData, message: "Transaction fetched successfully" };
	} catch (err) {
		logger.error("Error in creating Tag", err);
		throw err;
	}
};
module.exports = { addTransaction, getAllTransactions, getTransactionById };
