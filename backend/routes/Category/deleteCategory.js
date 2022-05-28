const sql = require("mssql");
const deleteCategory = async (req, res) => {
    const db = req.app.get("db");
    const { catID } = req.body;

    try {
        const result = await db.then((pool) =>
            pool
                .request()
                .input("cid", +catID)
                .output("out", sql.Int, -1)
                .execute("deleteCategory")
        );
        console.table(result.output.out);
        res.send({ output: result.output.out });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};
module.exports = deleteCategory;
