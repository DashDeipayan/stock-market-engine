function betterInterval(asyncFn, delayMs) {
	this.asyncFn = asyncFn;
	this.delayMs = delayMs;

	this.running = false;
}

betterInterval.prototype.cycle = async function (forced) {
	await this.asyncFn();
	await this.delay(this.delayMs);
	if (!forced && this.running) this.cycle();
};

betterInterval.prototype.start = function () {
	if (this.running) return;
	this.running = true;
	this.cycle();
};

betterInterval.prototype.stop = function () {
	if (this.running) this.running = false;
};

betterInterval.prototype.forceExecution = function () {
	if (this.running) this.cycle(true);
};

betterInterval.prototype.delay = function (ms) {
	return new Promise((res) => setTimeout(() => res(1), ms));
};

module.exports = betterInterval;
