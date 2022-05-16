import { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
// import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import axios from "../lib/axios";

const Home = ({ fetchCount }) => {
    const [products, setProducts] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        axios.get("/api").then((res) => {
            setProducts(res.data);
            console.log(res.data);
        });
    }, []);

    useEffect(() => {
        setUser(localStorage.getItem("username"));
    }, []);

    return (
        <Container maxWidth="xl">
            <Grid sx={{ marginTop: "20px" }} container spacing={3}>
                {products.map((product) => (
                    <Grid item key={product.productID}>
                        {/* <Link to={`/product/${product.productID}`}> */}
                        <ProductCard
                            fetchCount={fetchCount}
                            user={user}
                            productID={product.productID}
                            name={product.productName}
                            price={product.unitPrice}
                            catID={product.catID}
                            imgURL={product.imgURL}
                        />
                        {/* </Link> */}
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Home;
