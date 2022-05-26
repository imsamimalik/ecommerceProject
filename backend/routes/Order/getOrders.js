const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
    const db = req.app.get("db");
    const { username } = req.body;

    const getUserOrders = async () => {
        try {
            const result = await db.then(
                (pool) =>
                    pool.request()
                        .query`select * from userOrdersView where username=${username}`
            );
            console.table(result.recordset);
            res.send(result.recordset);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    };

    const getAllOrders = async () => {
        try {
            const result = await db.then(
                (pool) => pool.request().query`select * from userOrdersView`
            );
            console.table(result.recordset);
            res.send(result.recordset);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    };

    username === "all" ? getAllOrders() : getUserOrders();
});



module.exports = router;
