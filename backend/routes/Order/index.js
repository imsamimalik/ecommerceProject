const express = require("express");
const router = express.Router();
const getOrders = require("./getOrders");
const placeOrder = require("./placeOrder");
const deliverOrder = require("./deliverOrder");

router
    .get("/:username", getOrders)
    .post("/", placeOrder)
    .post("/deliver", deliverOrder);

module.exports = router;
