import { useCallback, useState, memo } from "react";

import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    IconButton,
    Typography,
    CardActionArea,
    Snackbar,
} from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import DeleteIcon from "@mui/icons-material/Delete";

import { Link } from "react-router-dom";
import axios from "../lib/axios";

let deleteProduct;

const ProductCard = ({
    name,
    price,
    productID,
    catID,
    imgURL,
    username,
    fetchCount,
    fetchProducts,
    wishlisted,
    fetchWishlist,
}) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("added to wishlist");

    const addToWishlist = useCallback(async () => {
        const result = await axios.post("/api/wishlist/", {
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
        const result =
            username &&
            (await axios.post("/api/cart/add", {
                productID,
                username,
                quantity: 1,
            }));
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

    deleteProduct = useCallback(
        async (productID) => {
            const result = await axios.delete("/api/product/", {
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
        },
        [username]
    );

    const deletefromWishlist = async (productID) => {
        const result = await axios.delete("/api/wishlist/", {
            data: {
                productID,
                username,
            },
        });

        if (result.data.output !== 1) {
            setOpen(true);
            setText("removed from wishlist");
        }

        setTimeout(() => {
            setOpen(false);
        }, 1000);
    };

    const handleWishlist = () => {
        if (username) {
            wishlisted
                ? deletefromWishlist(productID)
                      .then(() => fetchProducts())
                      .then(() => fetchWishlist())
                : addToWishlist()
                      .then(() => fetchProducts())
                      .then(() => fetchWishlist());
        }
    };

    return (
        <Card sx={{ maxWidth: 345, marginTop: "30px", position: "relative" }}>
            {username === process.env.REACT_APP_USERNAME && (
                <CardHeader
                    action={
                        <IconButton
                            onClick={() =>
                                deleteProduct(productID).then(() =>
                                    fetchProducts()
                                )
                            }
                        >
                            <DeleteIcon sx={{ color: "secondary.main" }} />
                        </IconButton>
                    }
                    sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 100,
                    }}
                />
            )}
            <Link to={`/product/${productID}`}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={`/assets/${imgURL}`}
                        alt={name}
                        sx={{
                            width: "290px",
                            height: "200px",
                            objectFit: "contain",
                        }}
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
                <IconButton
                    onClick={handleWishlist}
                    aria-label="add to favorites"
                >
                    <FavoriteIcon sx={{ color: wishlisted ? "red" : "" }} />
                </IconButton>

                <IconButton
                    onClick={() => addToCart().then(() => fetchCount())}
                    aria-label="add-to-cart"
                >
                    <AddShoppingCartIcon sx={{ color: "primary.main" }} />
                </IconButton>
            </CardActions>

            <Snackbar open={open} message={text} />
        </Card>
    );
};
export default memo(ProductCard);
export { deleteProduct };
