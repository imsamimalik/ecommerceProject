const express = require("express");
const router = express.Router();

const getBlacklist = require("./getBlacklist");
const addToBlacklist = require("./addToBlacklist");
const deleteFromBlacklist = require("./deleteFromBlacklist");

router
    .get("/", getBlacklist)
    .post("/", addToBlacklist)
    .delete("/", deleteFromBlacklist);

module.exports = router;
