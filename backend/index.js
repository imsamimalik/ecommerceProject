const express = require("express");
const cors = require("cors");
const dbConnect = require("./dbConnect");
const Products = require("./routes/Products");
const singleProduct = require("./routes/Products/singleProduct");
const Category = require("./routes/Category");
const loginUser = require("./routes/Users/loginUser");
const registerUser = require("./routes/Users/registerUser");
const getUser = require("./routes/Users/getUser");
const countCart = require("./routes/Cart/countCart");

const addToWishlist = require("./routes/Wishlist/addToWishlist");
const getWishlist = require("./routes/Wishlist/getWishlist");
const deleteFromWishlist = require("./routes/Wishlist/deleteFromWishlist");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

app.set("db", dbConnect.connect());
app.use(express.json({ limit: "100mb" }));

app.use("/api", Products);
app.use("/api/singleProduct", singleProduct);

app.use("/api/category", Category);

app.use("/api/register", registerUser);
app.use("/api/login", loginUser);
app.use("/api/user", getUser);

app.use("/api/countCart", countCart);

app.use("/api/addToWishlist", addToWishlist);
app.use("/api/wishlist", getWishlist);
app.use("/api/deleteFromWishlist", deleteFromWishlist);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
