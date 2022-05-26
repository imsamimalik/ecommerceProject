const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
    const db = req.app.get("db");

    const { orderID } = req.body;

    const dispatchOrder = async () => {
        try {
            await db.then((pool) =>
                pool
                    .request()
                    .input("oid", orderID)
                    .execute("updateDispatchDate")
            );
            console.log("dispatchOrder");
        } catch (error) {
            console.error(error);
        }
    };

    const updateReceiveDate = async () => {
        try {
            await db.then((pool) =>
                pool
                    .request()
                    .input("oid", orderID)
                    .execute("updateReceiveDate")
            );
            console.log("updateReceiveDate");
        } catch (error) {
            console.error(error);
        }
    };

    const updateDeliveryStatus = async () => {
        try {
            await db.then((pool) =>
                pool
                    .request()
                    .input("oid", orderID)
                    .input("status", 1)
                    .execute("updateDeliveryStatus")
            );
            console.log("updateDeliveryStatus");
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    };

    const updatePaymentStatus = async () => {
        try {
            await db.then((pool) =>
                pool
                    .request()
                    .input("oid", orderID)
                    .input("status", 1)
                    .execute("updatePaymentStatus")
            );
            console.log("updatePaymentStatus");
        } catch (error) {
            console.error(error);
        }
    };

    dispatchOrder()
        .then(() => updateReceiveDate())
        .then(() => updateDeliveryStatus())
        .then(() => updateDeliveryStatus())
        .then(() => updatePaymentStatus())
        .finally(() => {
            console.log("Order dispatched");
            res.status(200).json("Order dispatched");
        });
});

module.exports = router;
