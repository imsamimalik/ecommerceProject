import { useState, useEffect, useCallback, useContext, memo } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { UserContext } from "../App";
import axios from "../lib/axios";

const UserInfo = () => {
    const [user, setUser] = useState("");

    const { username: uname } = useContext(UserContext);

    const fetchUser = useCallback(async () => {
        await axios.post(`api/user/`, { username: uname }).then((res) => {
            console.log(res.data);
            setUser(res.data[0]);
        });
    }, [uname]);

    useEffect(() => {
        uname && fetchUser();
    }, [fetchUser, uname]);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                flex: 1,
                height: "calc(100vh - 64px)",
                borderRight: "1px solid #e0e0e0",
            }}
        >
            <Typography variant="h4" style={{ marginBottom: "36px" }}>
                {user.username}
            </Typography>
            <Avatar
                sx={{
                    width: 100,
                    height: 100,
                    marginBottom: "36px",
                }}
            />
            <Typography variant="h6">
                WalletBalance: Rs. {user.walletBalance}
            </Typography>
            <Typography variant="h6">Email: {user.email}</Typography>
            <Typography variant="h6">Address: {user.address}</Typography>
        </Box>
    );
};

export default memo(UserInfo);
