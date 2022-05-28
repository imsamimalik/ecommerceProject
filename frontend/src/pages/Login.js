import { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import axios from "../lib/axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function Login() {
    const [error, setError] = useState(false);

    let navigate = useNavigate();
    const { setUsername } = useContext(UserContext);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const _username = data.get("username");
        const password = data.get("password");

        try {
            const response = await axios.post("/api/user/login", {
                username: _username,
                password,
            });

            if (response.data.output === 1) {
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 1000);
                return;
            }
            localStorage.setItem("username", _username);
            setUsername(_username);
            navigate("/");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 15,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
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
                    <LockOutlinedIcon fontSize="large" />
                </Avatar>
                <Typography sx={{ mt: 3 }} component="h1" variant="h4">
                    Log in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
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
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Log In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link to="/register" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

            <Stack sx={{ mt: 2, width: "100%" }} spacing={2}>
                {error && (
                    <Alert severity="error">
                        Invalid Credentials. Please try again.
                    </Alert>
                )}
            </Stack>
        </Container>
    );
}
