const sql = require("mssql");

const deleteFromBlackList = async (req, res) => {
    const db = req.app.get("db");
    const { uid } = req.body;

    try {
        const result = await db.then((pool) =>
            pool
                .request()
                .input("uid", +uid)
                .output("out", sql.Int, -1)
                .execute("removeFromBlackList")
        );
        console.table(result.output.out);

        res.json({ output: result.output.out });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};
module.exports = deleteFromBlackList;
