class Investor {
	constructor(id, username, email, balance, transactions, ownedStocks) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.balance = balance;
		this.transactions = transactions;
		this.ownedStocks = ownedStocks;
	}
}

module.exports = Investor;
