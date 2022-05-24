import React from "react";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";

const Comment = ({ username, rating, reviewText, reviewDate, productImg }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                gap: 5,
                padding: 3,
                minWidth: "100px",
                border: "1px solid #e0e0e0",
            }}
        >
            {productImg ? (
                <Avatar
                    sx={{ width: 50, height: 50 }}
                    src={`/assets/${productImg}`}
                />
            ) : (
                <AccountCircleIcon sx={{ fontSize: 40 }} />
            )}

            <Box>
                <Box sx={{ display: "flex", gap: 3, mb: 1 }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        {username}
                    </Typography>
                    <Typography>rating: {rating}</Typography>
                </Box>
                <Typography
                    sx={{ fontStyle: "italic", textOverflow: "ellipsis" }}
                >
                    {reviewText}
                </Typography>
                <Typography variant="body2">{reviewDate}</Typography>
            </Box>
        </Paper>
    );
};

export default Comment;
