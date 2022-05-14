const express = require("express");
const router = express.Router();

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
                .query(
                    `delete from Wishlist where userID = '${uid}' and productID = '${productID}'`
                )
        );
        console.table(result.output.out);

        res.json({ output: result.output.out });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

module.exports = router;
