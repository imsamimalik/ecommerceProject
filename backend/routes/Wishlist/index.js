const express = require("express");
const router = express.Router();
const getWishlist = require("./getWishlist");
const addToWishlist = require("./addToWishlist");
const deleteFromWishlist = require("./deleteFromWishlist");

router
    .get("/:username", getWishlist)
    .post("/", addToWishlist)
    .delete("/", deleteFromWishlist);

module.exports = router;
