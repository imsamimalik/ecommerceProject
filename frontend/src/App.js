import { useEffect, useState, useCallback } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Profile from "./pages/Porfile";
import SingleProduct from "./pages/SingleProduct";
import axios from "./lib/axios";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";

function App() {
    const [username, setUsername] = useState(null);
    const [totalCart, setTotalCart] = useState(0);

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
        console.log(username);
    }, [username]);

    const fetchCountOfCart = useCallback(async () => {
        if (username !== null) {
            axios
                .post("/api/cart/countItems", { username })
                .then((res) => {
                    setTotalCart(res.data.output);
                })
                .catch((err) => console.log(err));
        }
    }, [username]);

    useEffect(() => {
        fetchCountOfCart();
    }, [fetchCountOfCart]);

    return (
        <div className="app">
            <CssBaseline />
            <Router>
                <Navbar username={username} countCart={totalCart} />
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route
                        exact
                        path="/product/:id"
                        element={<SingleProduct />}
                    />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route exact path="/wishlist" element={<Wishlist />} />
                    <Route
                        exact
                        path="/cart"
                        element={<Cart fetchCount={fetchCountOfCart} />}
                    />
                    <Route
                        exact
                        index
                        path="/"
                        element={<Home fetchCount={fetchCountOfCart} />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
