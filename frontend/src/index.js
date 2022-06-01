import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import AuthContextProvider from "./context/AuthContext";
import CategoryContextProvider from "./context/CategoryContext";
import UserContextProvider from "./context/UserContext";
import SearchContextProvider from "./context/SearchContext";

const root = createRoot(document.getElementById("root"));
root.render(
    <AuthContextProvider>
        <CategoryContextProvider>
            <UserContextProvider>
                <SearchContextProvider>
                    <App />
                </SearchContextProvider>
            </UserContextProvider>
        </CategoryContextProvider>
    </AuthContextProvider>
);
