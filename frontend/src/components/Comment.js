import React from "react";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
const Comment = ({ rev }) => {
    return (
        <Paper
            sx={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                gap: 5,
                padding: 3,
            }}
        >
            {console.log(rev)}
            <AccountCircleIcon sx={{ fontSize: 40 }} />

            <Box sx={{}}>
                <Box sx={{ display: "flex", gap: 3, mb: 1 }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        {rev.username}
                    </Typography>
                    <Typography>rating: {rev.rating}</Typography>
                </Box>
                <Typography sx={{ fontStyle: "italic" }}>
                    {rev.description}
                </Typography>
                <Typography variant="body2">{rev.reviewDate}</Typography>
            </Box>
        </Paper>
    );
};

export default Comment;
