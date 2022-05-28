const express = require("express");
const cors = require("cors");
const dbConnect = require("./dbConnect");

const Products = require("./routes/Products");

const Category = require("./routes/Category");

const Users = require("./routes/Users");

const Cart = require("./routes/Cart/");

const Wishlist = require("./routes/Wishlist");

const Reviews = require("./routes/Review");

const Coupon = require("./routes/Coupon");

const Order = require("./routes/Order");

const blackList = require("./routes/Blacklist");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

app.set("db", dbConnect.connect());
app.use(express.json({ limit: "100mb" }));

app.use("/api", Products);

app.use("/api/category", Category);

app.use("/api/user", Users);

app.use("/api/cart", Cart);

app.use("/api/wishlist", Wishlist);

app.use("/api/review", Reviews);

app.use("/api/coupon", Coupon);

app.use("/api/order", Order);

app.use("/api/blacklist", blackList);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
