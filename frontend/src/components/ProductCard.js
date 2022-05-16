import { useEffect, useCallback, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CardActionArea } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";

import { Link } from "react-router-dom";
import axios from "../lib/axios";

export default function ProductCard({
    name,
    price,
    productID,
    catID,
    imgURL,
    username,
    fetchCount,
    fetchProducts,
}) {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("added to wishlist");

    const addToWishlist = useCallback(async () => {
        const result = await axios.post("/api/wishlist/add", {
            productID,
            username,
        });
        if (result.data.output === 1) {
            setText("already in wishlist");
        } else {
            setText("added to wishlist");
        }
        setOpen(true);

        setTimeout(() => {
            setOpen(false);
        }, 1000);
    }, [productID, username]);

    const addToCart = useCallback(async () => {
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
    }, [productID, username]);

    const deleteProduct = useCallback(async () => {
        const result = await axios.delete("/api/product/delete", {
            data: {
                productID,
                username,
            },
        });

        if (result.data.output !== 0) {
            setText("unable to delete product");
        } else {
            setText("product deleted");
        }
        setOpen(true);

        setTimeout(() => {
            setOpen(false);
        }, 1000);
    }, [productID, username]);

    useEffect(() => {}, []);

    return (
        <Card sx={{ maxWidth: 345, marginTop: "30px", position: "relative" }}>
            {username === process.env.REACT_APP_USERNAME && (
                <CardHeader
                    action={
                        <IconButton
                            onClick={() =>
                                deleteProduct().then(() => fetchProducts())
                            }
                        >
                            <DeleteIcon sx={{ color: "secondary.main" }} />
                        </IconButton>
                    }
                    sx={{ position: "absolute", top: 0, right: 0, zIndex: 100 }}
                />
            )}
            <Link to={`/product/${productID}`}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="194"
                        image="https://mui.com/static/images/cards/paella.jpg"
                        alt="Paella dish"
                    />

                    <CardContent
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography variant="h6" color="text.secondary">
                            {name}
                        </Typography>
                        <Typography variant="h6" color="text.main">
                            Rs.{price}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Link>
            <CardActions
                sx={{ display: "flex", justifyContent: "space-between" }}
            >
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon
                        sx={{ color: "red" }}
                        onClick={addToWishlist}
                    />
                </IconButton>

                <IconButton aria-label="add-to-cart">
                    <AddShoppingCartIcon
                        sx={{ color: "primary.main" }}
                        onClick={() => addToCart().then(() => fetchCount())}
                    />
                </IconButton>
            </CardActions>

            <Snackbar open={open} message={text} />
        </Card>
    );
}
