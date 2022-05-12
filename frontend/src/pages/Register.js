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
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "../lib/axios";

const theme = createTheme();

export default function SignIn() {
    const [error, setError] = useState(false);

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
            const response = await axios.post("/api/register", {
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

            localStorage.setItem("username", username);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <Box
                    sx={{
                        marginTop: 15,
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
                        <AccountCircleIcon />
                    </Avatar>

                    <Typography
                        sx={{ mt: 3, mb: 3 }}
                        component="h1"
                        variant="h4"
                    >
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
                            }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                autoFocus
                                sx={{
                                    width: "49%",
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                sx={{
                                    width: "49%",
                                }}
                            />
                        </Box>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            type="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="password"
                        />
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                flex: 1,
                            }}
                        >
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="address"
                                label="Address"
                                id="address"
                                sx={{
                                    width: "49%",
                                }}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                type="number"
                                name="postalCode"
                                label="Postal Code"
                                id="postalCode"
                                sx={{
                                    width: "49%",
                                }}
                            />
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
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
        </ThemeProvider>
    );
}
