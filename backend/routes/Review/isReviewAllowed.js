const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
    const db = req.app.get("db");
    const { username, productID } = req.body;
    let uid = -1;
    try {
        const result = await db.then((pool) =>
            pool
                .request()
                .query(`SELECT ID FROM Users WHERE username = '${username}'`)
        );
        uid = result.recordset[0]?.ID;
        console.log(uid);
    } catch (error) {
        console.error(error);
    }

    try {
        const result = await db.then((pool) =>
            pool
                .request()
                .input("pid", +productID)
                .input("uid", +uid)
                .output("out", sql.Int, -1)
                .execute("isReviewAllowed")
        );
        console.table(result.output.out);

        res.json({ output: result.output.out });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

module.exports = router;
