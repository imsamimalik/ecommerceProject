const sql = require("mssql");

const addCategory = async (req, res) => {
    const db = req.app.get("db");
    const { catName } = req.body;

    try {
        const result = await db.then((pool) =>
            pool
                .request()
                .input("name", catName)
                .output("out", sql.Int, -1)
                .execute("addCategory")
        );
        res.send({ output: result.output.out });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

module.exports = addCategory;
