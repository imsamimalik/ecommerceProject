const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    const db = req.app.get("db");
    const id = +req.body.id;

    try {
        const result = await db.then((pool) =>
            pool
                .request()
                .query(
                    `select * from singleProductView where productID = '${id}'`
                )
        );
        console.table(result.recordset);
        res.send(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

module.exports = router;
