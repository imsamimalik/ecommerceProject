const express = require("express");
const router = express.Router();
const sql = require("mssql");

router.post("/", async (req, res) => {
    const db = req.app.get("db");
    const walletBalance = 50000;
    const warningCount = 0;
    const { email, password, name, username, address, postalCode } = req.body;

    try {
        const result = await db.then((pool) =>
            pool
                .request()
                .input("uname", name)
                .input("uemail", email)
                .input("username", username)
                .input("upassword", password)
                .input("uaddress", address)
                .input("upostalCode", +postalCode)
                .input("uWalletBalance", +walletBalance)
                .input("uWarningCount", +warningCount)
                .output("out", sql.Int, -1)
                .execute("registerUser")
        );
        console.table(result.output.out);

        res.json({ output: result.output.out });
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
});

module.exports = router;
