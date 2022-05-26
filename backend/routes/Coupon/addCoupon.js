const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
    const db = req.app.get("db");

    const { couponName, couponDiscount, couponCode } = req.body;

    try {
        const result = await db.then((pool) =>
            pool
                .request()
                .input("name", couponName)
                .input("discount", +couponDiscount)
                .input("code", couponCode)
                .output("out", sql.Int, -1)
                .execute("addCoupon")
        );

        console.log(result.output.out);
        res.status(200).send({ output: result.output.out });
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = router;
