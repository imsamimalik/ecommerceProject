const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    const db = req.app.get("db");
    const { search } = req.query;

    if (search === "") {
        try {
            const result = await db.then(
                (pool) => pool.request().query`select * from homeProductsView`
            );
            console.table(result.recordset);
            res.send(result.recordset);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    } else {
        try {
            const result = await db.then((pool) =>
                pool.request().input("text", search).execute("searchProduct")
            );
            console.table(result.recordset);
            res.send(result.recordset);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }
});

module.exports = router;
