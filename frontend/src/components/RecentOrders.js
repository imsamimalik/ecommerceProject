import { useState, useEffect, useCallback, useContext, memo } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { UserContext } from "../App";

import axios from "../lib/axios";

const RecentOrders = () => {
    const [orders, setOrders] = useState([]);

    const { username: uname } = useContext(UserContext);

    function groupByKey(array, key) {
        return array.reduce((hash, obj) => {
            if (obj[key] === undefined) return hash;
            return Object.assign(hash, {
                [obj[key]]: (hash[obj[key]] || []).concat(obj),
            });
        }, {});
    }

    const fetchOrders = useCallback(async () => {
        let _username = uname;
        if (_username === process.env.REACT_APP_USERNAME) _username = "all";
        await axios.get(`/api/order/${_username}`).then((res) => {
            console.log("orders", res.data);

            setOrders(groupByKey(res.data, "orderID"));
        });
    }, [uname]);

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
        uname && fetchOrders();
    }, [fetchOrders, uname]);

    return (
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
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography color="primary.main " variant="h6">
                                OrderID: {key}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography variant="h6">
                                OrderAmount:{" "}
                                {orders[key].reduce(
                                    (acc, val) => acc + val.retailPrice,
                                    0
                                )}
                            </Typography>
                            <Typography variant="h6">
                                username: {orders[key][0].username}
                            </Typography>
                            <Typography variant="h6">
                                orderPlacementDate:{" "}
                                {orders[key][0].orderPlacementDate}
                            </Typography>
                            <Typography
                                sx={{
                                    color: orders[key][0].deliveryStatus
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
                                {orders[key][0].deliveryStatus === 0
                                    ? "Pending"
                                    : "Delivered"}
                            </Typography>
                            <Typography variant="h6">
                                deliveryDate:{" "}
                                {orders[key][0].receiveDate || "-"}
                            </Typography>
                            <Typography variant="h6">
                                paymentMethod: {orders[key][0].paymentMethod}
                            </Typography>
                            <Typography variant="h6">
                                products:{" "}
                                {orders[key].map((element, i) => (
                                    <span
                                        style={{
                                            color: "blue",
                                        }}
                                        key={i * 9 + 8}
                                    >
                                        <Link
                                            to={`/product/${element.productID}`}
                                        >
                                            {element.productID}
                                        </Link>
                                        {i !== element.length && " "}
                                    </span>
                                ))}
                            </Typography>
                            {process.env.REACT_APP_USERNAME === uname && (
                                <Box sx={{ my: 2 }}>
                                    <Button
                                        onClick={() => deliverOrder(key)}
                                        fullWidth
                                        variant="contained"
                                        disabled={
                                            orders[key][0].deliveryStatus === 1
                                        }
                                    >
                                        {orders[key][0].deliveryStatus === 0
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
    );
};

export default memo(RecentOrders);
