const express = require("express");
const router = express.Router();
const getCoupons = require("./getCoupons");
const addCoupon = require("./addCoupon");
const deleteCoupon = require("./deleteCoupon");
const getDiscount = require("./getDiscount");

router
    .get("/", getCoupons)
    .post("/", addCoupon)
    .delete("/", deleteCoupon)
    .get("/:coupon", getDiscount);


module.exports = router;
