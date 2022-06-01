import { memo } from "react";
import {
    TextField,
    Box,
    InputAdornment,
    Rating,
    Typography,
    IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
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
                                <IconButton
                                    onClick={(event) =>
                                        submitReview(event).then(() =>
                                            fetchReviews()
                                        )
                                    }
                                >
                                    <SendIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </form>
        </Box>
    );
};

export default memo(CommentInput);
