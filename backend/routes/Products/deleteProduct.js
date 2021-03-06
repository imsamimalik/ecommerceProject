const sql = require("mssql");

const deleteProduct = async (req, res) => {
    const db = req.app.get("db");

    const { username, productID } = req.body;

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
};
module.exports = deleteProduct;
