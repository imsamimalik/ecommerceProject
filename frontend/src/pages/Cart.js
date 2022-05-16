import { useState, useEffect, useCallback } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import Badge from "@mui/material/Badge";
import Button from "@mui/material/Button";

import axios from "../lib/axios";

const Cart = ({ fetchCount }) => {
    const [cart, setCart] = useState([]);
    const [open, setOpen] = useState(false);

    let username = localStorage.getItem("username");

    const fetchCart = useCallback(async () => {
        await axios.post("/api/cart", { username }).then((res) => {
            console.log(res.data);
            setCart(res.data);
        });
    }, [username]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const deleteFromCart = async (productID) => {
        const result = await axios.delete("/api/cart/delete", {
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
                                    src="https://mui.com/static/images/cards/paella.jpg"
                                    height="100"
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
                            <IconButton>
                                <AddShoppingCartIcon
                                    onClick={() =>
                                        addToCart(item.productID).then(
                                            fetchCart().then(() => fetchCount())
                                        )
                                    }
                                />
                            </IconButton>
                            <IconButton color="secondary">
                                <DeleteIcon
                                    onClick={() =>
                                        deleteFromCart(item.productID).then(
                                            fetchCart().then(() => fetchCount())
                                        )
                                    }
                                />
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
                    {cart.reduce((acc, item) => acc + item.unitPrice, 0)}
                </Typography>
                <Button
                    sx={{ float: "right", mt: 5 }}
                    size="large"
                    variant="contained"
                >
                    Add to cart
                </Button>
            </Box>

            <Snackbar open={open} message="deleted from cart" />
        </Container>
    );
};

export default Cart;
