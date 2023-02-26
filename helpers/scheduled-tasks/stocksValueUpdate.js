const cron = require("node-cron");
const config = require("../../config");
const { updateStocksMarketValue } = require("../../models/stocks");

const timeToRefresh = config.scheduleTime;

const stocksUpdate = () => {
	cron.schedule(`*/${timeToRefresh} * * * * *`, function () {
		console.log(`running a task every ${timeToRefresh} seconds`);
		updateStocksMarketValue();
	});
};
module.exports = stocksUpdate;
