const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.delete("/", async (req, res) => {
    const db = req.app.get("db");

    const { username, productID } = req.body;

    if (username == "imsamimalik") {
        try {
            const result = await db.then((pool) =>
                pool
                    .request()
                    .input("pid", +productID)
                    .output("out", sql.Int, -1)
                    .execute("deleteProduct")
            );
            console.table(result.output.out);
            res.json({ output: result.output.out });
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    } else {
        console.error("You are not authorized to delete product");
        res.status(401).json("You are not authorized to delete product");
    }
});

module.exports = router;
