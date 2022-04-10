const cron = require("node-cron");
const {
	updateStocksMarketValue,
} = require("../../controllers/stockController");

const stocksUpdate = () => {
	cron.schedule("*/5 * * * * *", function () {
		console.log("running a task every 30 seconds");
		updateStocksMarketValue();
	});
};
module.exports = stocksUpdate;
