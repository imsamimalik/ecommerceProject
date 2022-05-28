const express = require("express");
const router = express.Router();
const getProducts = require("./getProducts");
const singleProduct = require("./singleProduct");
const deleteProduct = require("./deleteProduct");
const addProduct = require("./addProduct");
const editProduct = require("./editProduct");

router
    .get("/products", getProducts)
    .post("/product", addProduct)
    .get("/product/:id", singleProduct)
    .delete("/product/", deleteProduct)
    .put("/product", editProduct);

module.exports = router;
