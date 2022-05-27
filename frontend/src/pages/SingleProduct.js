import { useEffect, useState, useCallback, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { QuantityPicker } from "react-qty-picker";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { styled } from "@mui/material/styles";
import CommentInput from "../components/CommentInput";
import axios from "../lib/axios";
import Comment from "../components/Comment";
import { UserContext } from "../App";
import Modal from "@mui/material/Modal";
import AddProduct from "../components/AddProduct";
import { deleteProduct } from "../components/ProductCard";

const ProductContainer = styled(Container)(({ theme }) => ({
    marginTop: "50px",
    display: "flex",
    gap: 15,
    [theme.breakpoints.down("900")]: {
        flexDirection: "column !important",
    },
    [theme.breakpoints.up("sm")]: {
        flexDirection: "row",
    },
}));
const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
};

const SingleProduct = ({ fetchCount }) => {
    let { id } = useParams();
    let navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [value, setValue] = useState(1);
    const [open, setOpen] = useState(false);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [reviewsList, setReviewsList] = useState([]);
    const [reviewAllowed, setReviewAllowed] = useState(false);
    const [modal, setModal] = useState(false);

    const handleOpen = () => setModal(true);
    const handleClose = () => setModal(false);

    const { username } = useContext(UserContext);

    const fetchProduct = useCallback(async () => {
        const result = await axios.post(`/api/singleProduct`, { id });
        setProduct(result.data[0]);
        console.log(result.data[0]);
    }, [id]);

    const addToCart = useCallback(async () => {
        const result = await axios.post("/api/cart/add", {
            productID: id,
            username,
            quantity: value,
        });
        if (result.data.output === 0) {
            setOpen(true);

            setTimeout(() => {
                setOpen(false);
            }, 1000);
        }
    }, [id, username, value]);

    const submitReview = useCallback(
        async (e) => {
            e.preventDefault();
            if (review) {
                const result = await axios.post("/api/review/add", {
                    username,
                    productID: id,
                    rating,
                    review,
                });
                if (result.data.output === 0) {
                    setReview("");
                    setRating(0);
                }
            }
        },
        [username, id, rating, review]
    );

    const fetchReviews = useCallback(async () => {
        const result = await axios.post(`/api/review`, { productID: id });
        console.log(result.data);
        setReviewsList(result.data);
    }, [id]);

    const isReviewAllowed = useCallback(async () => {
        try {
            const result = await axios.post(`/api/review/isAllowed`, {
                username,
                productID: id,
            });
            if (result.data.output === 0) {
                setReviewAllowed(true);
            } else {
                setReviewAllowed(false);
            }
        } catch (err) {
            console.log(err);
        }
    }, [id, username]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    useEffect(() => {
        isReviewAllowed();
    }, [isReviewAllowed]);

    return (
        <>
            <ProductContainer maxWidth="lg">
                <Box
                    sx={{
                        maxHeight: "550px;",
                        aspectRatio: "7/6",
                        display: "flex",
                        mr: 2,
                    }}
                >
                    <img
                        src={`/assets/${product.imgURL}`}
                        alt={product.productName}
                        style={{ width: "-webkit-fill-available" }}
                    />
                </Box>
                <Box>
                    <Typography sx={{ mt: 3 }} variant="body2">
                        {product.catName}
                    </Typography>
                    <Typography component="h1" variant="h3">
                        {product.productName}
                    </Typography>
                    <Typography sx={{ mt: 3 }} variant="h5">
                        Rs. {product.unitPrice}
                    </Typography>
                    <Typography sx={{ mt: 3 }} variant="h5">
                        In Stock: {product.productQuantity}
                    </Typography>

                    <Box sx={{ mt: 3 }}>
                        <QuantityPicker
                            min={1}
                            max={product.productQuantity}
                            value={1}
                            smooth
                            onChange={(value) => setValue(value)}
                        />
                    </Box>
                    <Box
                        sx={{
                            mt: 3,
                        }}
                    >
                        <Button
                            fullWidth
                            color="success"
                            size="large"
                            variant="contained"
                            disabled={product.productQuantity === 0}
                            onClick={() => addToCart().then(() => fetchCount())}
                        >
                            Add to cart
                        </Button>
                    </Box>

                    {process.env.REACT_APP_USERNAME === username && (
                        <Box
                            sx={{
                                mt: 3,
                                display: "flex",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <Button
                                size="large"
                                variant="contained"
                                disabled={product.productQuantity === 0}
                                onClick={() => handleOpen()}
                            >
                                EditProduct
                            </Button>

                            <Button
                                size="large"
                                color="error"
                                variant="contained"
                                disabled={product.productQuantity === 0}
                                onClick={() =>
                                    deleteProduct(id).then(() => navigate("/"))
                                }
                            >
                                DeleteProduct
                            </Button>
                        </Box>
                    )}

                    <Typography sx={{ mt: 3 }} variant="subtitle1">
                        {product.productDescription}
                    </Typography>
                </Box>

                <Modal open={modal} onClose={handleClose}>
                    <Box sx={style}>
                        <AddProduct
                            product={product}
                            edit
                            handleClose={handleClose}
                            fetchProducts={fetchProduct}
                        />
                    </Box>
                </Modal>

                <Snackbar open={open} message="added to cart" />
            </ProductContainer>
            <Container
                sx={{
                    marginTop: "200px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 5,
                    marginBottom: "50px",
                }}
                maxWidth="lg"
            >
                <Typography variant="h4">Reviews</Typography>
                {reviewsList.map((rev) => (
                    <Comment
                        key={rev.reviewID}
                        username={rev.username}
                        reviewText={rev.reviewText}
                        rating={rev.rating}
                        reviewDate={rev.reviewDate}
                        pid={id}
                        reviewID={rev.reviewID}
                        fetchReviews={fetchReviews}
                    />
                ))}
                {reviewAllowed ? (
                    <CommentInput
                        review={review}
                        setReview={setReview}
                        rating={rating}
                        setRating={setRating}
                        submitReview={submitReview}
                        fetchReviews={fetchReviews}
                    />
                ) : (
                    <Box>
                        <Typography variant="h5">
                            Order this Product to leave a review.
                        </Typography>
                    </Box>
                )}
            </Container>
        </>
    );
};

export default SingleProduct;
