import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    let navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get("username");
        const password = data.get("password");
        const email = data.get("email");
        const address = data.get("address");
        const postalCode = data.get("postalCode");
        const name = data.get("name");
        try {
            const response = await axios.post("/api/user/register", {
                username,
                password,
                email,
                address,
                postalCode,
                name,
            });

            if (response.data.output === 1) {
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 1000);
                return;
            }

            navigate("/login");
        } catch (error) {
            console.log(error);
        }
        setTimeout(() => setLoading(false), 200);
    };
    return (
        <Container component="main" maxWidth="sm">
            <Box
                sx={{
                    marginTop: 12,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar
                    sx={{
                        m: 1,
                        bgcolor: "primary.main",
                        width: 60,
                        height: 60,
                    }}
                >
                    <AccountCircleIcon fontSize="large" />
                </Avatar>

                <Typography sx={{ mt: 3, mb: 3 }} component="h1" variant="h4">
                    Register
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flex: 1,
                            marginTop: "10px",
                        }}
                    >
                        <TextField
                            required
                            fullWidth
                            variant="standard"
                            label="Full Name"
                            name="name"
                            autoFocus
                            sx={{
                                width: "49%",
                            }}
                        />
                        <TextField
                            required
                            fullWidth
                            variant="standard"
                            label="Username"
                            name="username"
                            sx={{
                                width: "49%",
                            }}
                        />
                    </Box>
                    <TextField
                        required
                        fullWidth
                        variant="standard"
                        type="email"
                        label="Email Address"
                        name="email"
                        sx={{
                            marginTop: "20px",
                        }}
                    />
                    <TextField
                        required
                        fullWidth
                        variant="standard"
                        name="password"
                        label="Password"
                        type="password"
                        sx={{
                            marginTop: "30px",
                        }}
                    />
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            flex: 1,
                            marginTop: "20px",
                        }}
                    >
                        <TextField
                            required
                            fullWidth
                            variant="standard"
                            name="address"
                            label="Address"
                            sx={{
                                width: "49%",
                            }}
                        />
                        <TextField
                            required
                            fullWidth
                            variant="standard"
                            type="number"
                            name="postalCode"
                            label="Postal Code"
                            sx={{
                                width: "49%",
                            }}
                        />
                    </Box>
                    <Button
                        type="submit"
                        fullWidth
                        disabled={loading}
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/login" variant="body2">
                                {"Already have an account? Sign In"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Stack sx={{ mt: 2, width: "100%" }} spacing={2}>
                {error && (
                    <Alert severity="error">
                        Error occurred! Please try again.
                    </Alert>
                )}
            </Stack>
        </Container>
    );
}
