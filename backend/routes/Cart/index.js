const express = require("express");
const router = express.Router();

const addToCart = require("./addToCart");
const countCart = require("./countCart");
const deleteFromCart = require("./deleteFromCart");
const getCart = require("./getCart");

router
    .post("/add", addToCart)
    .post("/", getCart)
    .delete("/", deleteFromCart)
    .post("/count", countCart);

module.exports = router;
