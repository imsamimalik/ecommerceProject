const getCategories = async (req, res) => {
    const db = req.app.get("db");

    try {
        const result = await db.then(
            (pool) => pool.request().query`select * from Category`
        );
        console.table(result.recordset);
        res.send(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

module.exports = getCategories;
