const express = require("express");
const router = express.Router();
const getUser = require("./getUser");
const getReviews = require("./getReviews");
const loginUser = require("./loginUser");
const registerUser = require("./registerUser");

router
    .post("/", getUser)
    .post("/register", registerUser)
    .post("/login", loginUser)
    .post("/reviews", getReviews);

module.exports = router;
