import { useContext } from "react";
import { Box, Typography } from "@mui/material";

import Admin from "../components/Admin";
import RecentOrders from "../components/RecentOrders";
import RecentReviews from "../components/RecentReviews";
import UserInfo from "../components/UserInfo";
import { UserContext } from "../context/UserContext";

export default function Profile() {
    const { username: uname } = useContext(UserContext);

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    gap: 2,
                    flexDirection: { md: "column", lg: "row" },
                    mt: { md: 5 },
                }}
            >
                {process.env.REACT_APP_USERNAME === uname && <Admin />}
                {uname ? (
                    <>
                        <UserInfo />
                        <RecentOrders />
                        <RecentReviews />
                    </>
                ) : (
                    <Typography variant="h3" sx={{ mt: 10 }}>
                        Please login!
                    </Typography>
                )}
            </Box>
        </>
    );
}
