const sql = require("mssql");

const deleteReview = async (req, res) => {
    const db = req.app.get("db");
    const { username, reviewID, pid } = req.body;
    let uid = -1;

    try {
        const result = await db.then((pool) =>
            pool
                .request()
                .query(`SELECT ID FROM Users WHERE username = '${username}'`)
        );
        uid = result.recordset[0]?.ID;
        console.log(uid);
    } catch (error) {
        console.error(error);
    }

    try {
        const result = await db.then((pool) =>
            pool
                .request()
                .input("uid", +uid)
                .input("pid", +pid)
                .input("rid", +reviewID)
                .output("out", sql.Int, -1)
                .execute("deleteReview")
        );
        console.table(result.output.out);

        res.json({ output: result.output.out });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

module.exports = deleteReview;
