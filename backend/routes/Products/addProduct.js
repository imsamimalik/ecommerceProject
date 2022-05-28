const sql = require("mssql");

const addProduct = async (req, res) => {
    const db = req.app.get("db");

    const { name, unitPrice, imgURL, description, inStock, catID } = req.body;

    try {
        const result = await db.then((pool) =>
            pool
                .request()
                .input("name", name)
                .input("description", description)
                .input("unitPrice", unitPrice)
                .input("quantityInStock", inStock)
                .input("catID", catID)
                .input("imgURL", imgURL)
                .output("out", sql.Int, -1)
                .execute("addProduct")
        );
        console.table(result.output.out);
        res.json({ output: result.output.out });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};
module.exports = addProduct;
