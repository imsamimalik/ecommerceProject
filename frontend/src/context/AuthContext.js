import { useState, createContext } from "react";
export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, setAuthState] = useState("Login");

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthContextProvider;
