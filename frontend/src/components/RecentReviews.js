import { useState, useEffect, useCallback, useContext, memo } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import Comment from "./Comment";
import { UserContext } from "../App";

import axios from "../lib/axios";

const RecentReviews = () => {
    const [reviews, setReviews] = useState([]);
    const { username: uname } = useContext(UserContext);

    const fetchReviews = useCallback(async () => {
        await axios
            .post(`api/user/reviews`, { username: uname })
            .then((res) => {
                console.log(res.data);
                setReviews(res.data);
            });
    }, [uname]);

    useEffect(() => {
        uname && fetchReviews();
    }, [fetchReviews, uname]);

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                flexDirection: "column",
                height: "calc(100vh - 64px)",
                flex: 1,
                borderRight: "1px solid #e0e0e0",
            }}
        >
            <Typography
                variant="h4"
                style={{
                    marginBottom: "36px",
                    marginTop: "40px",
                    marginRight: "auto ",
                    marginLeft: "10px",
                }}
            >
                Recent Reviews
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        flex: 1,
                        gap: 1,
                        overflow: "scroll",
                        paddingBottom: "50px",
                    }}
                >
                    {reviews.map((review) => (
                        <Link
                            key={review.reviewID}
                            to={`/product/${review.productID}`}
                        >
                            <Comment
                                username={review.username}
                                rating={review.rating}
                                reviewText={review.reviewText}
                                reviewDate={review.reviewDate}
                                productImg={review.imgURL}
                            />
                        </Link>
                    ))}
                </Box>
            </Typography>
        </Box>
    );
};

export default memo(RecentReviews);
