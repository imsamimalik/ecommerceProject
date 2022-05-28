const express = require("express");
const router = express.Router();
const getReviews = require("./getReviews");
const addReview = require("./addReview");
const deleteReview = require("./deleteReview");
const isReviewAllowed = require("./isReviewAllowed");

router
    .get("/:productID", getReviews)
    .post("/", addReview)
    .delete("/", deleteReview)
    .post("/isAllowed", isReviewAllowed);



module.exports = router;
