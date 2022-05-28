const getReviews = async (req, res) => {
    const db = req.app.get("db");
    const { productID } = req.params;

    try {
        const result = await db.then(
            (pool) =>
                pool.request()
                    .query`select * from productReviewsView where productID=${productID}`
        );
        console.table(result.recordset);
        res.send(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

module.exports = getReviews;
