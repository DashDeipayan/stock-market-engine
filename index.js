"use strict";
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const config = require("./config");
const stocksUpdate = require("./helpers/scheduled-tasks/stocksValueUpdate");
const stockRoutes = require("./routes/stock-routes");
const investorRoutes = require("./routes/investor-routes");
const transactionsRoutes = require("./routes/transactions-route");
const buyOrSellStocks = require("./routes/buyOrSellStocks-route");
const rdsUserRoute = require("./routes/rdsUser-route");
const authRoute = require("./routes/auth");
const passport = require("passport");

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:3000",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.use(
	cookieSession({
		name: config.cookieName,
		keys: ["dash"],
		maxAge: 24 * 60 * 60 * 1000,
	})
);
app.use(passport.initialize());
app.use(passport.session());

// stocksUpdate();

app.use("/auth", authRoute.routes);
app.use("/api/stocks", stockRoutes.routes);
app.use("/api/rdsUser", rdsUserRoute.routes);
app.use("/api/investors", investorRoutes.routes);
app.use("/api/transactions", transactionsRoutes.routes);
app.use("/api/buyOrSellStocks", buyOrSellStocks.routes);

app.listen(config.port, () => console.log("App is listening"));
