const express = require("express");
const Products = require("./routes/Products");
const Category = require("./routes/Category");
const dbConnect = require("./dbConnect");
const loginUser = require("./routes/Users/loginUser");
const registerUser = require("./routes/Users/registerUser");

const PORT = process.env.PORT || 3001;
const app = express();

app.set("db", dbConnect.connect());
app.use(express.json({ limit: "100mb" }));

app.use("/", Products);
app.use("/category", Category);
app.use("/register", registerUser);
app.use("/login", loginUser);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
