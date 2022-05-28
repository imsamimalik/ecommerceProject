const singleProduct = async (req, res) => {
    const db = req.app.get("db");
    const id = +req.params.id;

    try {
        const result = await db.then((pool) =>
            pool
                .request()
                .query(
                    `select * from singleProductView where productID = '${id}'`
                )
        );
        console.table(result.recordset);
        res.send(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

module.exports = singleProduct;
