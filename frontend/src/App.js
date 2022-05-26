import { useEffect, useState, useCallback, createContext } from "react";
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

const SearchContext = createContext();
const UserContext = createContext();
const CategoryContext = createContext();
const AuthContext = createContext();

function App() {
    const [username, setUsername] = useState(null);
    const [totalCart, setTotalCart] = useState(0);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [authState, setAuthState] = useState("Login");

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
        console.log(username);
    }, [username]);

    const fetchCountOfCart = useCallback(async () => {
        username &&
            axios
                .post("/api/cart/countItems", { username })
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
            <UserContext.Provider value={{ username, setUsername }}>
                <AuthContext.Provider value={{ authState, setAuthState }}>
                    <SearchContext.Provider value={{ search, setSearch }}>
                        <CategoryContext.Provider
                            value={{ category, setCategory }}
                        >
                            <Router>
                                <Navbar countCart={totalCart} />
                                <Routes>
                                    <Route
                                        exact
                                        path="/login"
                                        element={<Login />}
                                    />
                                    <Route
                                        exact
                                        path="/register"
                                        element={<Register />}
                                    />
                                    <Route
                                        exact
                                        path="/product/:id"
                                        element={
                                            <SingleProduct
                                                fetchCount={fetchCountOfCart}
                                            />
                                        }
                                    />
                                    <Route
                                        exact
                                        path="/profile"
                                        element={<Profile />}
                                    />
                                    <Route
                                        exact
                                        path="/wishlist"
                                        element={
                                            <Wishlist
                                                fetchCount={fetchCountOfCart}
                                            />
                                        }
                                    />
                                    <Route
                                        exact
                                        path="/cart"
                                        element={
                                            <Cart
                                                fetchCount={fetchCountOfCart}
                                            />
                                        }
                                    />
                                    <Route
                                        exact
                                        index
                                        path="/"
                                        element={
                                            <Home
                                                fetchCount={fetchCountOfCart}
                                            />
                                        }
                                    />
                                    <Route
                                        exact
                                        path="/checkout"
                                        element={
                                            <Checkout
                                                fetchCount={fetchCountOfCart}
                                            />
                                        }
                                    />
                                </Routes>
                            </Router>
                        </CategoryContext.Provider>
                    </SearchContext.Provider>
                </AuthContext.Provider>
            </UserContext.Provider>
        </div>
    );
}

export default App;
export { SearchContext, UserContext, CategoryContext, AuthContext };
