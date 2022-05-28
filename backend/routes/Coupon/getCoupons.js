const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const db = req.app.get("db");

    try {
        const result = await db.then((pool) =>
            pool.request().query("SELECT * FROM Coupon")
        );

        console.table(result.recordset);
        res.status(200).send(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = router;
