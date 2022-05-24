import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

const CommentInput = ({
    review,
    setReview,
    rating,
    setRating,
    submitReview,
    fetchReviews,
}) => {
    return (
        <Box
            sx={{
                width: "100%",
                mt: 4,
            }}
        >
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Typography component="legend">Rating</Typography>
                <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                        setRating(newValue);
                    }}
                />
            </Box>
            <form
                onSubmit={(event) =>
                    submitReview(event).then(() => fetchReviews())
                }
            >
                <TextField
                    // multiline
                    minRows={2}
                    fullWidth
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    label="Review"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SendIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </form>
        </Box>
    );
};

export default CommentInput;
