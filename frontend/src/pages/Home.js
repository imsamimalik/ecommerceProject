import { useState, useEffect, useCallback, useContext } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard";
import FAB from "../components/FAB";
import axios from "../lib/axios";
import { SearchContext, CategoryContext } from "../App";
let filterByCategory, fetchProducts;
const Home = ({ fetchCount }) => {
    const [products, setProducts] = useState([]);
    const [username, setUsername] = useState(null);

    const { search } = useContext(SearchContext);
    const { category } = useContext(CategoryContext);

    fetchProducts = useCallback(async () => {
        await axios.get(`/api`, { params: { search } }).then((res) => {
            setProducts(res.data);
            console.log(res.data);
        });
    }, [search]);

    filterByCategory = async () => {
        await axios.post("/api/category/", { catID: category }).then((res) => {
            setProducts(res.data);
            console.log(res.data);
        });
    };

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
    }, []);

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
                                fetchCount={fetchCount}
                                fetchProducts={fetchProducts}
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
