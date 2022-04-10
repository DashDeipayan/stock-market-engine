const getRandomInt = (max) => {
	return Math.floor(Math.random() * max);
};

const randomMovements = () => {
	const randomMarketValue = parseFloat((Math.random() * 5).toFixed(2));
	const randomSign = getRandomInt(2);
	return randomSign ? randomMarketValue : randomMarketValue * -1;
};

module.exports = randomMovements;
