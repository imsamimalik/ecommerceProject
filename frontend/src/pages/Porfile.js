import { useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import axios from "../lib/axios";
import Comment from "../components/Comment";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

let uname = localStorage.getItem("username");

export default function Profile() {
    const [user, setUser] = useState("");
    const [reviews, setReviews] = useState([]);
    const [orders, setOrders] = useState([]);

    const fetchUser = useCallback(async () => {
        await axios.post(`api/user`, { username: uname }).then((res) => {
            console.log(res.data);
            setUser(res.data[0]);
        });
    }, []);

    const fetchReviews = useCallback(async () => {
        await axios
            .post(`api/user/reviews`, { username: uname })
            .then((res) => {
                console.log(res.data);
                setReviews(res.data);
            });
    }, []);

    function groupByKey(array, key) {
        return array.reduce((hash, obj) => {
            if (obj[key] === undefined) return hash;
            return Object.assign(hash, {
                [obj[key]]: (hash[obj[key]] || []).concat(obj),
            });
        }, {});
    }

    const fetchOrders = useCallback(async () => {
        await axios
            .post(`/api/order/getOrders`, { username: uname })
            .then((res) => {
                console.log("orders", res.data);

                setOrders(groupByKey(res.data, "orderID"));

                console.log(orders);
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
                                        sx={{
                                            // display: "flex",
                                            // alignItems: "center",
                                            // justifyContent: "center",
                                            // flexDirection: "column",
                                            border: "1px solid lightgrey",
                                            p: 2,
                                            flex: 1,
                                            mb: 5,
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
                                                deliveryStatus:{" "}
                                                {orders[key][0]
                                                    .deliveryStatus == 0
                                                    ? "Pending"
                                                    : "Delivered"}
                                            </Typography>
                                            <Typography variant="h6">
                                                paymentMethod:{" "}
                                                {orders[key][0].paymentMethod}
                                            </Typography>
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
                                }}
                            >
                                Recent Reviews
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
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
// <Box
//     sx={{
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         flexDirection: "column",
//     }}
// >
//     <Typography variant="h6">
//         Product ID:{" "}
//         {order.productID}
//     </Typography>
//     <Typography variant="h6">
//         Product Price: Rs.
//         {order.retailPrice}
//     </Typography>
//     <Typography variant="h6">
//         Product Quantity:{" "}
//         {order.productQuantity}
//     </Typography>
//     <Typography variant="h6">
//         Order Status:{" "}
//         {order.deliveryStatus}
//     </Typography>
// </Box>

// <Box
//     sx={{
//         display: "flex",
//         flexDirection: "column",
//         height: "calc(100vh - 64px)",
//         flex: 1,
//         p: 2,
//         borderRight: "1px solid #e0e0e0",
//     }}
// >
//     <Typography
//         variant="h4"
//         style={{
//             marginBottom: "36px",
//             marginTop: "40px",
//         }}
//     >
//         Recent Orders
//     </Typography>
//     <Box
//         sx={{
//             height: "calc(100vh - 64px)",
//             overflow: "scroll",
//             width: "100%",
//         }}
//     >
//         {Object.keys(orders).map((key) => (
//             <Paper
//                 elevation={3}
//                 sx={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                     flexDirection: "column",
//                     border: "1px solid lightgrey",
//                     p: 5,
//                     flex: 1,
//                     mb: 10,
//                 }}
//             >
//                 <Typography variant="h6">
//                     OrderID: {key}
//                 </Typography>
//                 <Typography variant="h6">
//                     OrderAmount:{" "}
//                     {orders[key].reduce(
//                         (acc, val) =>
//                             acc + val.retailPrice,
//                         0
//                     )}
//                 </Typography>

//                 <Typography variant="h6">
//                     deliveryStatus:{" "}
//                     {orders[key][0].deliveryStatus == 0
//                         ? "Pending"
//                         : "Delivered"}
//                 </Typography>
//                 <Typography variant="h6">
//                     paymentMethod:{" "}
//                     {orders[key][0].paymentMethod}
//                 </Typography>
//             </Paper>
//         ))}
//     </Box>
// </Box>;
