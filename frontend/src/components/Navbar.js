import {
    useState,
    useEffect,
    useContext,
    useTransition,
    useCallback,
} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";
import {
    SearchContext,
    UserContext,
    CategoryContext,
    AuthContext,
} from "../App";
import axios from "../lib/axios";
import { filterByCategory, fetchProducts } from "../pages/Home";

const SETTINGS = ["Profile", "Wishlist"];
let fetchCategories;

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    mx: 0,
    width: "100%",

    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
    },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "20ch",
            "&:focus": {
                width: "30ch",
            },
        },
    },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));

const Navbar = ({ countCart }) => {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [input, setInput] = useState("");
    const [categories, setCategories] = useState([]);

    const { setSearch } = useContext(SearchContext);
    const { username, setUsername } = useContext(UserContext);
    const { setCategory } = useContext(CategoryContext);
    const { authState, setAuthState } = useContext(AuthContext);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = async (id) => {
        setAnchorElNav(null);
        setCategory(id);
        navigate("/");
        await filterByCategory().then(() => filterByCategory());
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    let navigate = useNavigate();

    const handleLogout = () => {
        if (authState.toLowerCase() === "login") {
            navigate("/login");
        } else if (authState.toLowerCase() === "logout") {
            setUsername("");
            localStorage.removeItem("username");
        }
    };

    const [, startTransition] = useTransition();

    const handleSearch = (event) => {
        setInput(event.target.value);
        startTransition(() => {
            setSearch(event.target.value);
        });
    };

    fetchCategories = useCallback(async () => {
        const res = await axios.get("/api/categories");
        setCategories(res.data);
    }, []);

    useEffect(() => {
        if (username !== null) {
            setAuthState("Logout");
        } else {
            setAuthState("Login");
        }
    }, [username, setAuthState]);

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <AppBar position="static">
            <Container maxWidth="1080px">
                <Toolbar disableGutters>
                    <Link
                        onClick={() => {
                            fetchProducts();
                            setInput("");
                            setSearch("");
                        }}
                        to="/"
                    >
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                mr: 2,
                                display: { xs: "none", md: "flex" },
                                fontFamily: "monospace",
                                fontWeight: 700,
                                color: "#fff",
                                textDecoration: "none",
                            }}
                        >
                            ecommerce
                        </Typography>
                    </Link>
                    {/* mobile menu */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {categories?.map((category) => (
                                <MenuItem
                                    key={category.ID}
                                    onClick={handleCloseNavMenu}
                                >
                                    <Typography textAlign="center">
                                        {category.name}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>

                        <Search
                            sx={{
                                height: { xs: "40px" },
                                marginTop: "3px",
                            }}
                        >
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                value={input}
                                onChange={(event) => handleSearch(event)}
                                placeholder="Search…"
                            />
                        </Search>
                    </Box>
                    {/* Desktop menu */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", md: "flex" },
                            mx: "50px",
                            alignItems: "center",
                        }}
                    >
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                value={input}
                                onChange={(event) => handleSearch(event)}
                                placeholder="Search..."
                            />
                        </Search>
                        <Box sx={{ display: "flex", mx: 5 }}>
                            {categories?.map((category) => (
                                <Button
                                    key={category.ID}
                                    onClick={() =>
                                        handleCloseNavMenu(category.ID)
                                    }
                                    sx={{
                                        mx: 2,
                                        color: "white",
                                        display: "block",
                                    }}
                                >
                                    {category.name}
                                </Button>
                            ))}
                        </Box>
                    </Box>
                    {/* CART ICON */}
                    <Box sx={{ flexGrow: 0, mx: { xs: "13px", md: "20px" } }}>
                        <Link to="/cart">
                            <IconButton size="large">
                                <StyledBadge
                                    badgeContent={username && countCart}
                                    color="success"
                                >
                                    <ShoppingCartIcon sx={{ color: "#fff" }} />
                                </StyledBadge>
                            </IconButton>
                        </Link>
                    </Box>
                    {/* USER MENU */}
                    <Box sx={{ flexGrow: 0, mx: { xs: "13px" } }}>
                        <Tooltip title="Open settings">
                            <IconButton
                                onClick={handleOpenUserMenu}
                                sx={{ p: 0 }}
                            >
                                <Avatar
                                    sx={{ backgroundColor: "transparent" }}
                                />
                            </IconButton>
                        </Tooltip>

                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {SETTINGS.map((setting) => (
                                <Link
                                    to={`${setting.toLowerCase()}`}
                                    key={setting}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>
                                        <Typography
                                            textAlign="center"
                                            color="primary.main"
                                        >
                                            {setting}
                                        </Typography>
                                    </MenuItem>
                                </Link>
                            ))}

                            <MenuItem onClick={handleCloseUserMenu}>
                                <Typography
                                    onClick={handleLogout}
                                    textAlign="center"
                                    color="primary.main"
                                >
                                    {authState}
                                </Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
export { fetchCategories };