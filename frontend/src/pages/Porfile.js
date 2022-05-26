import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import axios from "../lib/axios";
import Comment from "../components/Comment";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import InputAdornment from "@mui/material/InputAdornment";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchCategories } from "../components/Navbar";
let uname = localStorage.getItem("username");

export default function Profile() {
    const [user, setUser] = useState("");
    const [reviews, setReviews] = useState([]);
    const [orders, setOrders] = useState([]);
    const [category, setCategory] = useState("");
    const [coupons, setCoupons] = useState("");
    const [couponName, setCouponName] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [couponDiscount, setCouponDiscount] = useState("");

    const fetchUser = useCallback(async () => {
        await axios.post(`api/user`, { username: uname }).then((res) => {
            console.log(res.data);
            setUser(res.data[0]);
        });
    }, []);

    const fetchReviews = useCallback(async () => {
        let _username = user?.username;
        await axios
            .post(`api/user/reviews`, { username: _username })
            .then((res) => {
                console.log(res.data);
                setReviews(res.data);
            });
    }, [user?.username]);

    function groupByKey(array, key) {
        return array.reduce((hash, obj) => {
            if (obj[key] === undefined) return hash;
            return Object.assign(hash, {
                [obj[key]]: (hash[obj[key]] || []).concat(obj),
            });
        }, {});
    }

    const fetchOrders = useCallback(async () => {
        let _username = user?.username;
        if (_username === process.env.REACT_APP_USERNAME) _username = "all";
        await axios
            .post(`/api/order/getOrders`, { username: _username })
            .then((res) => {
                console.log("orders", res.data);

                setOrders(groupByKey(res.data, "orderID"));

                console.log(orders);
            });
        // eslint-disable-next-line
    }, [user?.username]);

    const deliverOrder = useCallback(
        async (orderID) => {
            console.log("deliverOrder", orderID);
            await axios
                .post(`/api/order/deliverOrder`, { orderID })
                .then((res) => {
                    console.log(res.data);
                    fetchOrders();
                });
        },
        [fetchOrders]
    );

    const addCategory = useCallback(async () => {
        category &&
            (await axios
                .post(`/api/category/add`, {
                    catName: category,
                })
                .then((res) => {
                    console.log(res.data);
                    setCategory("");
                })
                .then(() => fetchCategories()));
    }, [category]);

    const fetchCoupons = useCallback(async () => {
        await axios.get(`/api/coupon`).then((res) => {
            console.log(res.data);
            setCoupons(res.data);
        });
    }, []);

    const addCoupon = useCallback(async () => {
        if (couponName && couponCode && couponDiscount) {
            await axios
                .post(`/api/coupon/add`, {
                    couponName,
                    couponCode,
                    couponDiscount,
                })
                .then((res) => {
                    console.log(res.data);
                    setCouponName("");
                    setCouponCode("");
                    setCouponDiscount("");
                });
        }
    }, [couponName, couponCode, couponDiscount]);

    const deleteCoupon = useCallback(async (code) => {
        await axios
            .post(`/api/coupon/delete`, {
                code,
            })
            .then((res) => {
                console.log(res.data);
            });
    }, []);

    useEffect(() => {
        uname && fetchUser();
    }, [fetchUser]);

    useEffect(() => {
        uname && fetchReviews();
    }, [fetchReviews]);

    useEffect(() => {
        uname && fetchOrders();
    }, [fetchOrders]);

    useEffect(() => {
        fetchCoupons();
    }, [fetchCoupons]);

    return (
        <>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
                alignItems="center"
                gap={2}
            >
                {uname ? (
                    <>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                flex: 1,
                                height: "calc(100vh - 64px)",
                                borderRight: "1px solid #e0e0e0",
                            }}
                        >
                            <Typography
                                variant="h4"
                                style={{ marginBottom: "36px" }}
                            >
                                {user.username}
                            </Typography>
                            <Avatar
                                sx={{
                                    width: 100,
                                    height: 100,
                                    marginBottom: "36px",
                                }}
                            />
                            <Typography variant="h6">
                                WalletBalance: Rs. {user.walletBalance}
                            </Typography>
                            <Typography variant="h6">
                                Email: {user.email}
                            </Typography>
                            <Typography variant="h6">
                                Address: {user.address}
                            </Typography>
                            {user.username ===
                                process.env.REACT_APP_USERNAME && (
                                <>
                                    <Box sx={{ my: 2 }}>
                                        <TextField
                                            value={category}
                                            onChange={(e) =>
                                                setCategory(e.target.value)
                                            }
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() =>
                                                                addCategory()
                                                            }
                                                        >
                                                            <AddIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            placeholder="add category"
                                        />
                                    </Box>
                                    <Box sx={{ px: 4 }}>
                                        <Typography
                                            color="primary.main "
                                            variant="h5"
                                        >
                                            Coupons
                                        </Typography>

                                        <Box>
                                            {coupons?.map((coupon) => (
                                                <Button
                                                    sx={{ m: 1 }}
                                                    variant="outlined"
                                                    startIcon={
                                                        <IconButton
                                                            onClick={() =>
                                                                deleteCoupon(
                                                                    coupon.code
                                                                ).then(() =>
                                                                    fetchCoupons()
                                                                )
                                                            }
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    }
                                                >
                                                    {coupon.code}
                                                </Button>
                                            ))}
                                        </Box>

                                        <Accordion
                                            sx={{
                                                border: "1px solid lightgrey",
                                                mt: 2,
                                                mb: 5,
                                                mr: 1,
                                                flex: 1,
                                            }}
                                        >
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                            >
                                                <Typography>
                                                    Add Coupon
                                                </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        // flexDirection: "column",
                                                        // width: "200px",
                                                        alignItems: "center",
                                                        justifyContent:
                                                            "center",
                                                        flexWrap: "wrap",
                                                        gap: 1,
                                                    }}
                                                >
                                                    <TextField
                                                        value={couponName}
                                                        onChange={(e) =>
                                                            setCouponName(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="coupon name"
                                                    />
                                                    <TextField
                                                        value={couponCode}
                                                        onChange={(e) =>
                                                            setCouponCode(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="coupon code"
                                                    />
                                                    <TextField
                                                        value={couponDiscount}
                                                        onChange={(e) =>
                                                            setCouponDiscount(
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="coupon discount"
                                                    />
                                                    <Button
                                                        variant="contained"
                                                        fullWidth
                                                        onClick={() =>
                                                            addCoupon().then(
                                                                () =>
                                                                    fetchCoupons()
                                                            )
                                                        }
                                                    >
                                                        Add Coupon
                                                    </Button>
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Box>
                                </>
                            )}
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                height: "calc(100vh - 64px)",
                                flex: 1,
                                p: 2,
                                borderRight: "1px solid #e0e0e0",
                            }}
                        >
                            <Typography
                                variant="h4"
                                style={{
                                    marginBottom: "36px",
                                    marginTop: "40px",
                                }}
                            >
                                Recent Orders
                            </Typography>
                            <Box
                                sx={{
                                    height: "calc(100vh - 64px)",
                                    overflow: "scroll",
                                    width: "100%",
                                }}
                            >
                                {Object.keys(orders).map((key) => (
                                    <Accordion
                                        key={key}
                                        sx={{
                                            border: "1px solid lightgrey",
                                            p: 2,
                                            flex: 1,
                                            mb: 5,
                                            mr: 1,
                                        }}
                                    >
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                        >
                                            <Typography
                                                color="primary.main "
                                                variant="h6"
                                            >
                                                OrderID: {key}
                                            </Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography variant="h6">
                                                OrderAmount:{" "}
                                                {orders[key].reduce(
                                                    (acc, val) =>
                                                        acc + val.retailPrice,
                                                    0
                                                )}
                                            </Typography>
                                            <Typography variant="h6">
                                                orderPlacementDate:{" "}
                                                {
                                                    orders[key][0]
                                                        .orderPlacementDate
                                                }
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    color: orders[key][0]
                                                        .deliveryStatus
                                                        ? "green"
                                                        : "red",
                                                }}
                                                variant="h6"
                                            >
                                                <span
                                                    style={{
                                                        color: "rgba(0, 0, 0, 0.87)",
                                                    }}
                                                >
                                                    deliveryStatus:
                                                </span>{" "}
                                                {orders[key][0]
                                                    .deliveryStatus === 0
                                                    ? "Pending"
                                                    : "Delivered"}
                                            </Typography>
                                            <Typography variant="h6">
                                                deliveryDate:{" "}
                                                {orders[key][0].receiveDate ||
                                                    "-"}
                                            </Typography>
                                            <Typography variant="h6">
                                                paymentMethod:{" "}
                                                {orders[key][0].paymentMethod}
                                            </Typography>
                                            <Typography variant="h6">
                                                products:{" "}
                                                {orders[key].map(
                                                    (element, i) => (
                                                        <span
                                                            style={{
                                                                color: "blue",
                                                            }}
                                                            key={i * 9 + 8}
                                                        >
                                                            <Link
                                                                to={`/product/${element.productID}`}
                                                            >
                                                                {
                                                                    element.productID
                                                                }
                                                            </Link>
                                                            {i !==
                                                                element.length &&
                                                                " "}
                                                        </span>
                                                    )
                                                )}
                                            </Typography>
                                            {process.env.REACT_APP_USERNAME ===
                                                user.username && (
                                                <Box sx={{ my: 2 }}>
                                                    <Button
                                                        onClick={() =>
                                                            deliverOrder(key)
                                                        }
                                                        fullWidth
                                                        variant="contained"
                                                        disabled={
                                                            orders[key][0]
                                                                .deliveryStatus ===
                                                            1
                                                        }
                                                    >
                                                        {orders[key][0]
                                                            .deliveryStatus ===
                                                        0
                                                            ? "Deliver"
                                                            : "Delivered"}
                                                    </Button>
                                                </Box>
                                            )}
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-start",
                                flexDirection: "column",
                                height: "calc(100vh - 64px)",
                                flex: 1,
                                borderRight: "1px solid #e0e0e0",
                            }}
                        >
                            <Typography
                                variant="h4"
                                style={{
                                    marginBottom: "36px",
                                    marginTop: "40px",
                                    marginRight: "auto ",
                                    marginLeft: "10px",
                                }}
                            >
                                Recent Reviews
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        flex: 1,
                                        gap: 1,
                                        overflow: "scroll",
                                        paddingBottom: "50px",
                                    }}
                                >
                                    {reviews.map((review) => (
                                        <Link
                                            key={review.reviewID}
                                            to={`/product/${review.productID}`}
                                        >
                                            <Comment
                                                username={review.username}
                                                rating={review.rating}
                                                reviewText={review.reviewText}
                                                reviewDate={review.reviewDate}
                                                productImg={review.imgURL}
                                            />
                                        </Link>
                                    ))}
                                </Box>
                            </Typography>
                        </Box>
                    </>
                ) : (
                    <Typography variant="h3" sx={{ mt: 10 }}>
                        Please login!
                    </Typography>
                )}
            </Box>
        </>
    );
}