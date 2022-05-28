const express = require("express");
const router = express.Router();
const addCategory = require("./addCategory");
const filterByCategory = require("./filterByCategory");
const getCategories = require("./getCategories");
const deleteCategory = require("./deleteCategory");

router
    .get("/", getCategories)
    .post("/", addCategory)
    .post("/filter", filterByCategory)
    .delete("/", deleteCategory);


module.exports = router;
