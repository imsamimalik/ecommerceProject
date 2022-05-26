const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
    const db = req.app.get("db");

    const { username, cart, discount, payment } = req.body;
    let uid, oid, isBlackListed;

    const getUID = async () => {
        try {
            const result = await db.then((pool) =>
                pool
                    .request()
                    .query(
                        `SELECT ID FROM Users WHERE username = '${username}'`
                    )
            );
            uid = result.recordset[0].ID;
            console.log(uid);
        } catch (error) {
            console.error(error);
        }
    };

    const placeOrder = async () => {
        try {
            const result = await db.then((pool) =>
                pool
                    .request()
                    .input("uid", uid)
                    .output("oid", sql.Int, -1)
                    .output("out", sql.Int, -1)
                    .execute("placeOrder")
            );
            oid = result.output.oid;
            isBlackListed = result.output.out;
            console.log(oid);
            console.log("Blacklisted", isBlackListed);
        } catch (error) {
            console.error(error);
        }
    };

    const addProductsToOrder = async () => {
        if (isBlackListed === 0) {
            try {
                cart.forEach((product) => {
                    db.then((pool) =>
                        pool
                            .request()
                            .input("oid", oid)
                            .input("pid", product.productID)
                            .input("quantity", product.productQuantity)
                            .input("discount", discount)
                            .output("out", sql.Int, -1)
                            .execute("addProductsToOrder")
                    );
                });

                console.log("products added");
            } catch (error) {
                console.error(error);
                res.status(500).json(error);
            }
        }
    };

    const finalizeOrder = async () => {
        try {
            const result = await db.then((pool) =>
                pool
                    .request()
                    .input("oid", oid)
                    .input("uid", uid)
                    .input("paymentMethod", payment)
                    .output("out", sql.Int, -1)
                    .execute("finalizeOrder")
            );
        } catch (error) {
            console.error(error);
        }
    };

    getUID()
        .then(() => placeOrder())
        .then(() => addProductsToOrder())
        .then(() => finalizeOrder())
        .finally(() => {
            console.log("order placed");
            res.send({ oid });
        });
});

module.exports = router;
