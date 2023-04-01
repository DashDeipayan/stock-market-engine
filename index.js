"use strict";
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");

const { cookieData, port } = require("./config");
const stockRoutes = require("./routes/stock-routes");
const investorRoutes = require("./routes/investor-routes");
const transactionsRoutes = require("./routes/transactions-route");
const purchaseRoutes = require("./routes/purchase-route");
const rdsUserRoute = require("./routes/rdsUser-route");
const authRoute = require("./routes/auth");
const passport = require("passport");
const investmentRoute = require("./routes/investment-route");
const stocksUpdate = require("./helpers/scheduled-tasks/stocksValueUpdate");
const config = require("./config");

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: config.hostUrl,
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);
app.use(cookieSession(cookieData));
app.use(passport.initialize());
app.use(passport.session());

stocksUpdate();

app.use("/auth", authRoute.routes);
app.use("/api/stocks", stockRoutes.routes);
app.use("/api/rdsUser", rdsUserRoute.routes);
app.use("/api/investors", investorRoutes.routes);
app.use("/api/transactions", transactionsRoutes.routes);
app.use("/api/investments", investmentRoute.routes);
app.use("/api/purchase", purchaseRoutes.routes);

app.listen(port, () => console.log("App is listening at port:", port));
