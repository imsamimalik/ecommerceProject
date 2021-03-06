import { useState, useEffect, useCallback, useContext } from "react";
import {
    Container,
    Typography,
    Box,
    Paper,
    IconButton,
    Snackbar,
    Badge,
    Button,
} from "@mui/material/";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import axios from "../lib/axios";

const Cart = ({ fetchCount }) => {
    const [cart, setCart] = useState([]);
    const [open, setOpen] = useState(false);

    const { username } = useContext(UserContext);

    const fetchCart = useCallback(async () => {
        username &&
            (await axios.post("/api/cart", { username }).then((res) => {
                console.log(res.data);
                setCart(res.data);
            }));
    }, [username]);

    useEffect(() => {
        username && fetchCart();
    }, [username, fetchCart]);

    const deleteFromCart = async (productID) => {
        const result = await axios.delete("/api/cart/", {
            data: {
                productID,
                username,
            },
        });
        if (result.data.output === 1) {
            setOpen(true);
        }

        setTimeout(() => {
            setOpen(false);
        }, 1000);
    };

    const addToCart = async (productID) => {
        await axios.post("/api/cart/add", {
            productID,
            username,
            quantity: 1,
        });
    };

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant="h3">Cart</Typography>
            {cart.length === 0 ? (
                <Box sx={{ textAlign: "center", mt: 10 }}>
                    <Typography variant="h5">
                        You have no items in your cart.
                    </Typography>
                </Box>
            ) : (
                cart.map((item) => (
                    <Paper
                        sx={{ mt: 3, display: "flex", padding: 2 }}
                        key={item.cartID}
                    >
                        <Badge
                            badgeContent={item.productQuantity}
                            color="primary"
                        >
                            <Box>
                                <img
                                    src={`/assets/${item.imgURL}`}
                                    // height="100"
                                    width="100"
                                    alt="product"
                                />
                            </Box>
                        </Badge>
                        <Box sx={{ mx: 3 }}>
                            <Typography variant="h5">
                                {item.productName}
                            </Typography>
                            <Typography variant="h6" sx={{ mt: 2 }}>
                                Rs.{item.unitPrice}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                marginLeft: "auto",
                            }}
                        >
                            <IconButton
                                onClick={() =>
                                    addToCart(item.productID).then(
                                        fetchCart().then(() => fetchCount())
                                    )
                                }
                            >
                                <AddShoppingCartIcon />
                            </IconButton>
                            <IconButton
                                onClick={() =>
                                    deleteFromCart(item.productID).then(() =>
                                        fetchCart().then(() => fetchCount())
                                    )
                                }
                                color="secondary"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                ))
            )}

            <Box
                sx={{
                    mt: 10,
                }}
            >
                <Typography variant="h5" sx={{ textAlign: "right" }}>
                    Total: Rs.
                    {cart.reduce(
                        (acc, item) =>
                            acc + item.unitPrice * item.productQuantity,
                        0
                    )}
                </Typography>
                <Link to="/checkout">
                    <Button
                        disabled={!Boolean(cart.length)}
                        sx={{ float: "right", mt: 5 }}
                        size="large"
                        variant="contained"
                    >
                        Place Order
                    </Button>
                </Link>
            </Box>

            <Snackbar open={open} message="deleted from cart" />
        </Container>
    );
};

export default Cart;
