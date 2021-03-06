const sql = require("mssql");

const filterByCategory = async (req, res) => {
    const db = req.app.get("db");
    const { catID } = req.body;

    try {
        const result = await db.then((pool) =>
            pool
                .request()
                .input("catID", +catID)
                .execute("searchCategroy")
        );
        console.table(result.recordset);
        res.send(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

module.exports = filterByCategory;
