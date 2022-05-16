const express = require("express");
const cors = require("cors");
const dbConnect = require("./dbConnect");

const Products = require("./routes/Products");
const singleProduct = require("./routes/Products/singleProduct");
const deleteProduct = require("./routes/Products/deleteProduct");
const addProduct = require("./routes/Products/addProduct");

const Category = require("./routes/Category");
const loginUser = require("./routes/Users/loginUser");
const registerUser = require("./routes/Users/registerUser");
const getUser = require("./routes/Users/getUser");

const addToCart = require("./routes/Cart/addToCart");
const countItems = require("./routes/Cart/countItems");
const getCart = require("./routes/Cart/getCart");
const deleteFromCart = require("./routes/Cart/deleteFromCart");

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
app.use("/api/product/delete", deleteProduct);
app.use("/api/product/add", addProduct);

app.use("/api/category", Category);

app.use("/api/register", registerUser);
app.use("/api/login", loginUser);
app.use("/api/user", getUser);

app.use("/api/cart/countItems", countItems);
app.use("/api/cart/add", addToCart);
app.use("/api/cart", getCart);
app.use("/api/cart/delete", deleteFromCart);

app.use("/api/wishlist/add", addToWishlist);
app.use("/api/wishlist", getWishlist);
app.use("/api/wishlist/delete", deleteFromWishlist);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
