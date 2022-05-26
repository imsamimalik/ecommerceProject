const express = require("express");
const cors = require("cors");
const dbConnect = require("./dbConnect");

const Products = require("./routes/Products");
const singleProduct = require("./routes/Products/singleProduct");
const deleteProduct = require("./routes/Products/deleteProduct");
const addProduct = require("./routes/Products/addProduct");

const Category = require("./routes/Category");
const filterByCategory = require("./routes/Category/filterByCategory");
const addCategory = require("./routes/Category/addCategory");

const loginUser = require("./routes/Users/loginUser");
const registerUser = require("./routes/Users/registerUser");
const getUser = require("./routes/Users/getUser");
const getReviewsOfUser = require("./routes/Users/getReviews");

const addToCart = require("./routes/Cart/addToCart");
const countItems = require("./routes/Cart/countItems");
const getCart = require("./routes/Cart/getCart");
const deleteFromCart = require("./routes/Cart/deleteFromCart");

const addToWishlist = require("./routes/Wishlist/addToWishlist");
const getWishlist = require("./routes/Wishlist/getWishlist");
const deleteFromWishlist = require("./routes/Wishlist/deleteFromWishlist");

const addReview = require("./routes/Review/addReview");
const getReviews = require("./routes/Review");
const deleteReview = require("./routes/Review/deleteReview");
const isReviewAllowed = require("./routes/Review/isReviewAllowed");

const fetchCoupons = require("./routes/Coupon");
const getDiscount = require("./routes/Coupon/getDiscount");
const addCoupon = require("./routes/Coupon/addCoupon");
const deleteCoupon = require("./routes/Coupon/deleteCoupon");

const placeOrder = require("./routes/Order/placeOrder");
const getOrders = require("./routes/Order/getOrders");
const deliverOrder = require("./routes/Order/deliverOrder");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());

app.set("db", dbConnect.connect());
app.use(express.json({ limit: "100mb" }));

app.use("/api", Products);
app.use("/api/singleProduct", singleProduct);
app.use("/api/product/delete", deleteProduct);
app.use("/api/product/add", addProduct);

app.use("/api/categories", Category);
app.use("/api/category/", filterByCategory);
app.use("/api/category/add", addCategory);

app.use("/api/register", registerUser);
app.use("/api/login", loginUser);
app.use("/api/user", getUser);
app.use("/api/user/reviews", getReviewsOfUser);

app.use("/api/cart/countItems", countItems);
app.use("/api/cart/add", addToCart);
app.use("/api/cart", getCart);
app.use("/api/cart/delete", deleteFromCart);

app.use("/api/wishlist/add", addToWishlist);
app.use("/api/wishlist", getWishlist);
app.use("/api/wishlist/delete", deleteFromWishlist);

app.use("/api/review/add", addReview);
app.use("/api/review", getReviews);
app.use("/api/review/delete", deleteReview);
app.use("/api/review/isAllowed", isReviewAllowed);

app.use("/api/coupon", fetchCoupons);
app.use("/api/coupon/getDiscount", getDiscount);
app.use("/api/coupon/add", addCoupon);
app.use("/api/coupon/delete", deleteCoupon);

app.use("/api/order/placeOrder", placeOrder);
app.use("/api/order/getOrders", getOrders);
app.use("/api/order/deliverOrder", deliverOrder);

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
