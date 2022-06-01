import { useState, useEffect, useCallback, useContext } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Paper, IconButton, Snackbar } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserContext } from "../context/UserContext";
import axios from "../lib/axios";

const Wishlist = ({ fetchCount }) => {
    const [wishlist, setWishlist] = useState([]);
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("added to wishlist");

    const { username } = useContext(UserContext);

    const fetchWishlist = useCallback(async () => {
        await axios.get(`/api/wishlist/${username}`).then((res) => {
            console.log(res.data);
            setWishlist(res.data);
        });
    }, [username]);

    useEffect(() => {
        username && fetchWishlist();
    }, [username, fetchWishlist]);

    const deletefromWishlist = async (productID) => {
        const result = await axios.delete("/api/wishlist/", {
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

    const addToCart = useCallback(
        async (productID) => {
            const result = await axios.post("/api/cart/add", {
                productID,
                username,
                quantity: 1,
            });
            if (result.data.output !== 0) {
                setText("already in cart");
            } else {
                setText("added to cart");
            }
            setOpen(true);

            setTimeout(() => {
                setOpen(false);
            }, 1000);
        },
        [username]
    );

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant="h3">Wishlist</Typography>
            {wishlist.length === 0 ? (
                <Box sx={{ textAlign: "center", mt: 10 }}>
                    <Typography variant="h5">
                        You have no items in your wishlist.
                    </Typography>
                </Box>
            ) : (
                wishlist.map((item) => (
                    <Paper
                        sx={{ mt: 3, display: "flex", padding: 2 }}
                        key={item.wishlistID}
                    >
                        <Box>
                            <img
                                src={`/assets/${item.imgURL}`}
                                height="100"
                                alt="product"
                            />
                        </Box>
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
                                    addToCart(item.productID)
                                        .then(() => fetchWishlist())
                                        .then(() => fetchCount())
                                }
                            >
                                <AddShoppingCartIcon />
                            </IconButton>
                            <IconButton
                                onClick={() => {
                                    deletefromWishlist(item.productID).then(
                                        fetchWishlist
                                    );
                                }}
                                color="secondary"
                            >
                                <DeleteIcon />
                            </IconButton>
                        </Box>
                    </Paper>
                ))
            )}

            <Snackbar open={open} message={text} />
        </Container>
    );
};

export default Wishlist;
