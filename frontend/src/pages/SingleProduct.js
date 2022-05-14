import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "../lib/axios";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { QuantityPicker } from "react-qty-picker";
import Button from "@mui/material/Button";

const SingleProduct = () => {
    let { id } = useParams();
    const [product, setProduct] = useState({});
    const [, setValue] = useState(1);

    const fetchProduct = useCallback(async () => {
        const result = await axios.post(`/api/singleProduct`, { id });
        setProduct(result.data[0]);
        console.log(result.data[0]);
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    return (
        <Container
            sx={{
                marginTop: "50px",
                display: "flex",
                flexDirection: "row",
                gap: 15,
            }}
            maxWidth="lg"
        >
            <Box
                sx={{
                    height: "250px;",
                    display: "flex",
                    //alignItems: "center",
                    //justifyContent: "center",
                }}
            >
                <img
                    src={"https://mui.com/static/images/cards/paella.jpg"}
                    alt={product.productName}
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
                {/* <Typography sx={{ mt: 3 }} variant="h5">
                    In Stock: {product.productQuantity}
                </Typography> */}

                <Box sx={{ mt: 3 }}>
                    <QuantityPicker
                        min={0}
                        max={product.productQuantity}
                        value={1}
                        smooth
                        onChange={(value) => setValue(value)}
                    />
                </Box>
                <Box
                    sx={{
                        mt: 3,
                        //  display: "flex", justifyContent: "center"
                    }}
                >
                    <Button fullWidth size="large" variant="contained">
                        Add to cart
                    </Button>
                </Box>

                <Typography sx={{ mt: 3 }} variant="subtitle1">
                    {/* {product.productDescription} */}
                    lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.lorem ipsum dolor sit amet, consectetur adipiscing
                    elit.
                </Typography>
            </Box>
        </Container>
    );
};

export default SingleProduct;
