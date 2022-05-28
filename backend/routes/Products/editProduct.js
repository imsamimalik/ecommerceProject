const editProduct = async (req, res) => {
    const db = req.app.get("db");

    const { pid, name, unitPrice, imgURL, description, inStock, catID } =
        req.body;

    try {
        await db.then((pool) =>
            pool
                .request()
                .input("pid", +pid)
                .input("name", name)
                .input("desc", description)
                .input("price", +unitPrice)
                .input("stock", +inStock)
                .input("cid", +catID)
                .input("img", imgURL)
                .execute("editProduct")
        );
        res.status(200).send("Product edited");
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
};

module.exports = editProduct;
