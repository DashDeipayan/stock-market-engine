"use strict";
const express = require("express");
const cors = require("cors");

const config = require("./config");
const stocksUpdate = require("./helpers/scheduled-tasks/stocksValueUpdate");
const stockRoutes = require("./routes/stock-routes");
const investorRoutes = require("./routes/investor-routes");
const transactionsRoutes = require("./routes/transactions-route");
const buyOrSellStocks = require("./routes/buyOrSellStocks-route");

const app = express();

app.use(express.json());
app.use(cors());

stocksUpdate();

app.use("/api/stocks", stockRoutes.routes);
app.use("/api/investors", investorRoutes.routes);
app.use("/api/transactions", transactionsRoutes.routes);
app.use("/api/buyOrSellStocks", buyOrSellStocks.routes);

app.listen(config.port, () => console.log("App is listening"));

//UtlxWoOCb405CHKcNBd3
//FOZO3Uw7R8UnBhSymOQG
