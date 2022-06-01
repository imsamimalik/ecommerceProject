import { useState, useEffect, useCallback, useContext } from "react";
import { Container, Grid } from "@mui/material";
import ProductCard from "../components/ProductCard";
import axios from "../lib/axios";
import FAB from "../components/FAB";
import { CategoryContext } from "../context/CategoryContext";
import { SearchContext } from "../context/SearchContext";
import { UserContext } from "../context/UserContext";

let filterByCategory, fetchProducts;

const Home = ({ fetchCount }) => {
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    const { search } = useContext(SearchContext);
    const { category } = useContext(CategoryContext);
    const { username, setUsername } = useContext(UserContext);

    fetchProducts = useCallback(async () => {
        await axios.get(`/api/products`, { params: { search } }).then((res) => {
            setProducts(res.data);
            console.log(res.data);
        });
    }, [search]);

    filterByCategory = async () => {
        await axios
            .post(`/api/category/filter`, { catID: category })
            .then((res) => {
                setProducts(res.data);
                console.log(res.data);
            });
    };

    const fetchWishlist = useCallback(async () => {
        username &&
            (await axios.get(`/api/wishlist/${username}`).then((res) => {
                console.log(res.data);
                setWishlist(res.data);
            }));
    }, [username]);

    const isWishlisted = useCallback(
        (productID) => wishlist.some((wish) => wish.productID === productID),
        [wishlist]
    );

    useEffect(() => {
        fetchProducts();
    }, [search]);

    useEffect(() => {
        fetchWishlist();
    }, [fetchWishlist]);

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
    }, [setUsername]);

    return (
        <>
            <Container maxWidth="xl" sx={{ mb: 5 }}>
                <Grid
                    sx={{
                        marginTop: "20px",
                        display: "flex",
                        justifyContent: "center",
                    }}
                    container
                    spacing={3}
                >
                    {products.map((product) => (
                        <Grid item key={product.productID}>
                            <ProductCard
                                wishlisted={isWishlisted(product.productID)}
                                fetchCount={fetchCount}
                                fetchProducts={fetchProducts}
                                fetchWishlist={fetchWishlist}
                                username={username}
                                productID={product.productID}
                                name={product.productName}
                                price={product.unitPrice}
                                catID={product.catID}
                                imgURL={product.imgURL}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
            {username === process.env.REACT_APP_USERNAME && (
                <FAB fetchProducts={fetchProducts} />
            )}
        </>
    );
};

export default Home;
export { filterByCategory, fetchProducts };
