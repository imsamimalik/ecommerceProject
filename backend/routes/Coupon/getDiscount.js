const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
    const db = req.app.get("db");

    const { coupon } = req.body;
    let cid = -1;

    try {
        const result = await db.then((pool) =>
            pool
                .request()
                .input("code", coupon)
                .output("id", sql.Int, -1)
                .execute("getCouponID")
        );
        cid = result.output.id;
        console.log(cid);
    } catch (error) {
        console.error(error);
    }

    try {
        const result = await db.then((pool) =>
            pool
                .request()
                .input("id", cid)
                .output("out", sql.Int, -1)
                .output("discount", sql.Int, -1)
                .execute("getDiscountOfCoupon")
        );
        console.table({
            output: result.output.out,
            discount: result.output.discount,
        });

        res.json({
            output: result.output.out,
            discount: result.output.discount,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

module.exports = router;
