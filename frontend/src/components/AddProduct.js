import { useState, useEffect, useCallback, memo } from "react";
import {
    Button,
    TextField,
    Box,
    Typography,
    Container,
    Alert,
    Stack,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
} from "@mui/material";

import axios from "../lib/axios";

const AddProduct = ({ handleClose, fetchProducts, edit, product }) => {
    const [error, setError] = useState(false);
    const [category, setCategory] = useState(product?.catName);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState(product?.productName);
    const [unitPrice, setUnitPrice] = useState(product?.unitPrice);
    const [description, setDescription] = useState(product?.productDescription);
    const [imgURL, setImgURL] = useState(product?.imgURL);
    const [inStock, setInStock] = useState(product?.productQuantity);

    const fetchCategories = useCallback(async () => {
        const result = await axios.get("/api/category");

        setCategories(result.data);
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const editProduct = async (event) => {
        event.preventDefault();

        let catID;

        categories?.forEach((cat) => {
            if (cat.name === category) {
                catID = cat.ID;
            }
        });
        await axios.put(`/api/product`, {
            pid: product.productID,
            name,
            description,
            unitPrice,
            inStock,
            catID,
            imgURL,
        });
    };

    const addProduct = async (event) => {
        event.preventDefault();

        let catID;
        categories?.forEach((cat) => {
            if (cat.name === category) {
                catID = cat.ID;
            }
        });

        try {
            const response = await axios.post("/api/product/", {
                name,
                unitPrice,
                description,
                imgURL,
                inStock,
                catID,
            });

            if (response.data.output !== 0) {
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 1000);
                return;
            }
        } catch (error) {
            console.log(error);
        }
        setName("");
        setUnitPrice("");
        setDescription("");
        setImgURL("");
        setInStock("");
        setCategory("");
        handleClose();
        fetchProducts();
    };

    const handleSubmit = edit ? editProduct : addProduct;

    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography sx={{ mt: 1, mb: 3 }} component="h1" variant="h4">
                    {edit ? "Edit" : "Add"} Product
                </Typography>
                <Box
                    component="form"
                    onSubmit={(event) =>
                        handleSubmit(event)
                            .then(() => handleClose())
                            .then(() => fetchProducts())
                    }
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flex: 1,
                            marginTop: "10px",
                        }}
                    >
                        <TextField
                            required
                            fullWidth
                            variant="standard"
                            label="Product Name"
                            name="name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            autoFocus
                            sx={{
                                width: "49%",
                            }}
                        />
                        <TextField
                            required
                            fullWidth
                            variant="standard"
                            label="Price"
                            value={unitPrice}
                            onChange={(event) =>
                                setUnitPrice(event.target.value)
                            }
                            name="unitPrice"
                            type="number"
                            sx={{
                                width: "49%",
                            }}
                        />
                    </Box>
                    <TextField
                        required
                        fullWidth
                        variant="standard"
                        label="Image URL"
                        value={imgURL}
                        onChange={(event) => setImgURL(event.target.value)}
                        name="imgURL"
                        sx={{
                            marginTop: "20px",
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        multiline
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        variant="standard"
                        name="description"
                        label="Description"
                        sx={{
                            marginTop: "30px",
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flex: 1,
                            marginTop: "20px",
                        }}
                    >
                        <TextField
                            required
                            fullWidth
                            variant="standard"
                            name="inStock"
                            value={inStock}
                            onChange={(event) => setInStock(event.target.value)}
                            type="number"
                            label="In Stock"
                            sx={{
                                width: "49%",
                            }}
                        />
                        <Box>
                            <FormControl
                                variant="standard"
                                sx={{ m: 1, minWidth: 120 }}
                            >
                                <InputLabel id="categories">
                                    Category
                                </InputLabel>
                                <Select
                                    labelId="categories"
                                    value={category}
                                    label="Category"
                                    onChange={(event) => {
                                        setCategory(event.target.value);
                                    }}
                                >
                                    {categories.map((category) => (
                                        <MenuItem
                                            value={category.name}
                                            key={category.ID}
                                        >
                                            {category.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                </Box>
            </Box>

            <Stack sx={{ mt: 2, width: "100%" }} spacing={2}>
                {error && (
                    <Alert severity="error">
                        Error occurred! Please try again.
                    </Alert>
                )}
            </Stack>
        </Container>
    );
};
export default memo(AddProduct);
