import { useEffect, useState, useCallback, useContext } from "react";
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
import Checkout from "./pages/Checkout";
import { UserContext } from "./context/UserContext";

function App() {
    const [totalCart, setTotalCart] = useState(0);

    const { username } = useContext(UserContext);
    const fetchCountOfCart = useCallback(async () => {
        username &&
            axios
                .post("/api/cart/count", { username })
                .then((res) => {
                    setTotalCart(res.data.output);
                })
                .catch((err) => console.log(err));
    }, [username]);

    useEffect(() => {
        fetchCountOfCart();
    }, [fetchCountOfCart]);

    return (
        <div className="app">
            <CssBaseline />

            <Router>
                <Navbar countCart={totalCart} />
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route
                        exact
                        path="/product/:id"
                        element={
                            <SingleProduct fetchCount={fetchCountOfCart} />
                        }
                    />
                    <Route exact path="/profile" element={<Profile />} />
                    <Route
                        exact
                        path="/wishlist"
                        element={<Wishlist fetchCount={fetchCountOfCart} />}
                    />
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
                    <Route
                        exact
                        path="/checkout"
                        element={<Checkout fetchCount={fetchCountOfCart} />}
                    />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
