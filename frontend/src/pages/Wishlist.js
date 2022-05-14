import { useState, useEffect, useCallback } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";

import axios from "../lib/axios";

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([]);
    const [open, setOpen] = useState(false);

    let username = localStorage.getItem("username");

    const fetchWishlist = useCallback(async () => {
        await axios.post("/api/wishlist", { username }).then((res) => {
            console.log(res.data);
            setWishlist(res.data);
        });
    }, [username]);

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    const deletefromWishlist = async (productID) => {
        const result = await axios.post("/api/deleteFromWishlist", {
            productID,
            username,
        });
        if (result.data.output === 1) {
            setOpen(true);
        }

        setTimeout(() => {
            setOpen(false);
        }, 1000);
    };

    return (
        <Container sx={{ mt: 10 }}>
            <Typography variant="h3">Wishlist</Typography>

            {wishlist.map((item) => (
                <Paper
                    sx={{ mt: 3, display: "flex", padding: 2 }}
                    key={item.wishlistID}
                >
                    <Box>
                        <img
                            src="https://mui.com/static/images/cards/paella.jpg"
                            height="100"
                            alt="product"
                        />
                    </Box>
                    <Box sx={{ mx: 3 }}>
                        <Typography variant="h5">{item.productName}</Typography>
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
                            <AddShoppingCartIcon />
                        </IconButton>
                        <IconButton color="secondary">
                            <DeleteIcon
                                onClick={() => {
                                    deletefromWishlist(item.productID).then(
                                        fetchWishlist
                                    );
                                }}
                            />
                        </IconButton>
                    </Box>
                </Paper>
            ))}
            <Snackbar open={open} message="deleted from wishlist" />
        </Container>
    );
};

export default Wishlist;
