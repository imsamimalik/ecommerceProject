import { useState, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import axios from "../lib/axios";
import { fetchCategories } from "../components/Navbar";
import {
    TextField,
    InputAdornment,
    IconButton,
    Typography,
    Button,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 1200,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
    height: "600px",
    borderRadius: "10px",
    overflow: "scroll",
};

const Admin = () => {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState("");
    const [coupons, setCoupons] = useState([]);
    const [couponName, setCouponName] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [couponDiscount, setCouponDiscount] = useState("");
    const [blacklist, setBlacklist] = useState([]);
    const [uid, setUid] = useState("");

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const addCategory = useCallback(async () => {
        category &&
            (await axios
                .post(`/api/category/add`, {
                    catName: category,
                })
                .then((res) => {
                    console.log(res.data);
                    setCategory("");
                })
                .then(() => fetchCategories()));
    }, [category]);

    const fetchCoupons = useCallback(async () => {
        await axios.get(`/api/coupon`).then((res) => {
            console.log(res.data);
            setCoupons(res.data);
        });
    }, []);

    const addCoupon = useCallback(async () => {
        if (couponName && couponCode && couponDiscount) {
            await axios
                .post(`/api/coupon/add`, {
                    couponName,
                    couponCode,
                    couponDiscount,
                })
                .then((res) => {
                    console.log(res.data);
                    setCouponName("");
                    setCouponCode("");
                    setCouponDiscount("");
                });
        }
    }, [couponName, couponCode, couponDiscount]);

    const deleteCoupon = useCallback(async (code) => {
        await axios
            .post(`/api/coupon/delete`, {
                code,
            })
            .then((res) => {
                console.log(res.data);
            });
    }, []);

    const fetchBlacklist = useCallback(async () => {
        await axios.get(`/api/blacklist`).then((res) => {
            console.log(res.data);
            setBlacklist(res.data);
        });
    }, []);

    const addToBlacklist = useCallback(async () => {
        uid &&
            (await axios
                .post(`/api/blacklist/add`, {
                    username: uid,
                })
                .then((res) => {
                    console.log(res.data);
                    setUid("");
                }));
    }, [uid]);

    const deleteFromBlacklist = useCallback(async (uid) => {
        await axios
            .post(`/api/blacklist/remove`, {
                uid,
            })
            .then((res) => {
                console.log(res.data);
            });
    }, []);

    useEffect(() => {
        fetchCoupons();
    }, [fetchCoupons]);

    useEffect(() => {
        fetchBlacklist();
    }, [fetchBlacklist]);

    return (
        <Box sx={{ position: "fixed", bottom: 15, right: 15 }}>
            <Fab onClick={handleOpen} color="secondary" aria-label="add">
                <AddIcon />
            </Fab>

            <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                    <Typography
                        variant="h3"
                        sx={{ my: 2, textAlign: "center" }}
                    >
                        Admin Privileges
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                        <Box
                            sx={{
                                my: 2,
                                p: 2,
                                borderRight: "2px solid lightgrey",
                                flex: 1,
                            }}
                        >
                            <Typography variant="h5" sx={{ mb: 2 }}>
                                Categories
                            </Typography>
                            <TextField
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => addCategory()}
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="add category"
                            />
                        </Box>
                        <Box
                            sx={{
                                my: 2,
                                p: 2,
                                borderRight: "2px solid lightgrey",
                                flex: 1.5,
                            }}
                        >
                            <Typography variant="h5" sx={{ mb: 2 }}>
                                Coupons
                            </Typography>
                            <Box>
                                {coupons?.map((coupon) => (
                                    <Button
                                        key={coupon.code}
                                        sx={{ m: 1, textTransform: "none" }}
                                        variant="outlined"
                                        startIcon={
                                            <IconButton
                                                onClick={() =>
                                                    deleteCoupon(
                                                        coupon.code
                                                    ).then(() => fetchCoupons())
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        {coupon.code}
                                    </Button>
                                ))}
                            </Box>

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 3,
                                    mt: 8,
                                }}
                            >
                                <TextField
                                    value={couponName}
                                    variant="standard"
                                    onChange={(e) =>
                                        setCouponName(e.target.value)
                                    }
                                    placeholder="coupon name"
                                />
                                <TextField
                                    value={couponCode}
                                    variant="standard"
                                    onChange={(e) =>
                                        setCouponCode(e.target.value)
                                    }
                                    placeholder="coupon code"
                                />
                                <TextField
                                    value={couponDiscount}
                                    variant="standard"
                                    onChange={(e) =>
                                        setCouponDiscount(e.target.value)
                                    }
                                    placeholder="coupon discount"
                                />
                                <Button
                                    variant="contained"
                                    sx={{ px: 6 }}
                                    onClick={() =>
                                        addCoupon().then(() => fetchCoupons())
                                    }
                                >
                                    Add Coupon
                                </Button>
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                my: 2,
                                p: 2,
                                flex: 1,
                            }}
                        >
                            <Typography variant="h5" sx={{ mb: 2 }}>
                                Blacklist Users
                            </Typography>

                            <TextField
                                value={uid}
                                onChange={(e) => setUid(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() =>
                                                    addToBlacklist().then(() =>
                                                        fetchBlacklist()
                                                    )
                                                }
                                            >
                                                <AddIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="add user"
                            />

                            <Box sx={{ mt: 2 }}>
                                {blacklist?.map((list) => (
                                    <Button
                                        key={list.userID}
                                        sx={{
                                            m: 1,
                                            textTransform: "none",
                                        }}
                                        variant="outlined"
                                        startIcon={
                                            <IconButton
                                                onClick={() =>
                                                    deleteFromBlacklist(
                                                        list.userID
                                                    ).then(() =>
                                                        fetchBlacklist()
                                                    )
                                                }
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        {list.username}
                                    </Button>
                                ))}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default Admin;
