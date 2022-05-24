import { useState, useCallback, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import RedeemIcon from "@mui/icons-material/Redeem";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "../lib/axios";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const METHODS = ["COD", "Wallet"];

export default function Checkout({ fetchCount }) {
    const [error, setError] = useState(false);
    const [payment, setPayment] = useState("");
    const [coupon, setCoupon] = useState("");
    const [cart, setCart] = useState([]);
    const [discount, setDiscount] = useState(0);
    const [orderID, setOrderID] = useState(false);
    const [text, setText] = useState("invalid coupon");

    let username = localStorage.getItem("username");

    const fetchCart = useCallback(async () => {
        await axios.post("/api/cart", { username }).then((res) => {
            console.log(res.data);
            setCart(res.data);
        });
    }, [username]);

    const calcPrice = useCallback(() => {
        let originalPrice = cart.reduce(
            (acc, item) => acc + item.unitPrice * item.productQuantity,
            0
        );
        let discountedPrice = originalPrice - (originalPrice * discount) / 100;
        return discountedPrice;
    }, [discount, cart]);

    const placeOrder = useCallback(async () => {
        const result = await axios.post("/api/order/placeOrder", {
            username,
            cart,
            discount,
            payment,
        });

        if (result.data.oid > 0) {
            setOrderID(result.data.oid);
        } else {
            setText("order failed!");
            setError(true);
            setTimeout(() => {
                setError(false);
            }, 1000);
        }
    }, [cart, discount, username, payment]);

    const getDiscount = useCallback(
        async (e) => {
            e.preventDefault();
            await axios
                .post("/api/coupon/getDiscount", { coupon })
                .then((res) => {
                    console.log(res.data);

                    if (res.data.output === 0) {
                        setDiscount(res.data.discount);
                    } else {
                        setDiscount(0);
                        setText("invalid coupon");
                        setError(true);
                        setTimeout(() => {
                            setError(false);
                        }, 1000);
                    }
                });
        },
        [coupon]
    );

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    return (
        <Container component="main" maxWidth="sm">
            <Paper sx={{ paddintTop: 6, paddingBottom: 10 }}>
                <Box
                    sx={{
                        marginTop: 15,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Avatar
                        sx={{
                            m: 1,
                            bgcolor: "primary.main",
                            width: 60,
                            height: 60,
                        }}
                    >
                        {!orderID ? (
                            <RedeemIcon fontSize="large" />
                        ) : (
                            <CheckCircleOutlineIcon fontSize="large" />
                        )}
                    </Avatar>
                    <Typography sx={{ mt: 3 }} component="h1" variant="h4">
                        {!orderID ? "Checkout" : "Your order has been placed!"}
                    </Typography>
                    {!orderID ? (
                        <Box
                            component="form"
                            onSubmit={async (event) => {}}
                            noValidate
                            sx={{
                                mt: 1,
                                width: "100%",
                                px: 5,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    mt: 2,
                                }}
                            >
                                <Typography>Payment Method</Typography>
                                <FormControl
                                    variant="standard"
                                    sx={{ m: 1, minWidth: 120 }}
                                >
                                    <InputLabel id="categories">
                                        Payment
                                    </InputLabel>
                                    <Select
                                        labelId="categories"
                                        value={payment}
                                        label="Category"
                                        onChange={(event) => {
                                            setPayment(event.target.value);
                                        }}
                                    >
                                        {METHODS.map((method) => (
                                            <MenuItem
                                                value={method.toLowerCase()}
                                                key={method}
                                            >
                                                {method}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    mt: 2,
                                }}
                            >
                                <Typography>Coupon Code</Typography>
                                <TextField
                                    autoComplete="off"
                                    sx={{ width: "15ch" }}
                                    InputProps={{
                                        endAdornment: coupon && (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={(event) =>
                                                        getDiscount(event)
                                                    }
                                                >
                                                    <SendIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                    variant="standard"
                                    placeholder="Coupon Code"
                                    value={coupon}
                                    onChange={(event) => {
                                        setCoupon(event.target.value);
                                    }}
                                />
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    mt: 4,
                                }}
                            >
                                <Typography>Discount</Typography>
                                <Typography>{discount} %</Typography>
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    mt: 5,
                                }}
                            >
                                <Typography variant="h5">Total</Typography>
                                <Typography variant="h5">
                                    Rs.
                                    {calcPrice()}
                                </Typography>
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() =>
                                    placeOrder().then(() => fetchCount())
                                }
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    width: "50%",
                                    alignSelf: "center",
                                }}
                            >
                                Confirm Order
                            </Button>
                        </Box>
                    ) : (
                        <Typography sx={{ marginTop: 3 }}>
                            Your Order ID is{" "}
                            <Typography
                                sx={{ color: "primary.main" }}
                                component="span"
                                variant="h6"
                            >
                                {orderID}
                            </Typography>
                        </Typography>
                    )}
                </Box>
            </Paper>
            <Snackbar open={error} message={text} />
        </Container>
    );
}
