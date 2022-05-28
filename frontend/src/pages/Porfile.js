import { useState, useEffect, useCallback, useContext } from "react";
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

import { UserContext } from "../App";
import Admin from "../components/Admin";

export default function Profile() {
    const [user, setUser] = useState("");
    const [reviews, setReviews] = useState([]);
    const [orders, setOrders] = useState([]);

    const { username: uname } = useContext(UserContext);

    const fetchUser = useCallback(async () => {
        await axios.post(`api/user/`, { username: uname }).then((res) => {
            console.log(res.data);
            setUser(res.data[0]);
        });
    }, [uname]);

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
        await axios.get(`/api/order/${_username}`).then((res) => {
            console.log("orders", res.data);

            setOrders(groupByKey(res.data, "orderID"));

            console.log(orders);
        });
        // eslint-disable-next-line
    }, [user?.username]);

    const deliverOrder = useCallback(
        async (orderID) => {
            console.log("deliverOrder", orderID);
            await axios.post(`/api/order/deliver`, { orderID }).then((res) => {
                console.log(res.data);
                fetchOrders();
            });
        },
        [fetchOrders]
    );

    useEffect(() => {
        uname && fetchUser();
    }, [fetchUser, uname]);

    useEffect(() => {
        uname && fetchReviews();
    }, [fetchReviews, uname]);

    useEffect(() => {
        uname && fetchOrders();
    }, [fetchOrders, uname]);
    return (
        <>
            <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-around"
                alignItems="center"
                gap={2}
            >
                {process.env.REACT_APP_USERNAME === uname && <Admin />}
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
                                                username:{" "}
                                                {orders[key][0].username}
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
