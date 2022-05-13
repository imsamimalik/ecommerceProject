const express = require("express");
const cors = require("cors");
const Products = require("./routes/Products");
const Category = require("./routes/Category");
const dbConnect = require("./dbConnect");
const loginUser = require("./routes/Users/loginUser");
const registerUser = require("./routes/Users/registerUser");
const getUser = require("./routes/Users/getUser");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

app.set("db", dbConnect.connect());
app.use(express.json({ limit: "100mb" }));

app.use("/api", Products);
app.use("/api/category", Category);

app.use("/api/register", registerUser);
app.use("/api/login", loginUser);
app.use("/api/user", getUser);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
