const getReviews = async (req, res) => {
    const db = req.app.get("db");
    const { username } = req.body;

    try {
        const result = await db.then((pool) =>
            pool
                .request()
                .input("username", username)
                .execute("getReviewsOfUser")
        );
        console.table(result.recordset);

        res.json(result.recordset);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

module.exports = getReviews;
