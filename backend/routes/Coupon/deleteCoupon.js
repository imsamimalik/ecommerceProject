const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
    const db = req.app.get("db");

    const { code } = req.body;

    try {
        await db.then((pool) =>
            pool.request().input("code", code).execute("deleteCoupon")
        );

        console.log("Coupon deleted");
        res.status(200).send("Coupon deleted");
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = router;
