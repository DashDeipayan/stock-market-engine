class Transactions {
	constructor(
		TransactionId,
		StockSymbol,
		InvestorId,
		StockId,
		transactionValue,
		transactionType,
		transactionDate
	) {
		this.TransactionId = TransactionId;
		this.StockSymbol = StockSymbol;
		this.InvestorId = InvestorId;
		this.StockId = StockId;
		this.transactionValue = transactionValue;
		this.transactionType = transactionType;
		this.transactionDate = transactionDate;
	}
}

module.exports = Transactions;
