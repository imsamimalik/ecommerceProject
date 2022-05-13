import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";

function App() {
    return (
        <div className="app">
            <CssBaseline />
            <Router>
                <Navbar />
                <Routes>
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact index path="/" element={<h1>Hi</h1>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
