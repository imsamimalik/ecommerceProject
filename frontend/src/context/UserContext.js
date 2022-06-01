import { useEffect, useState, createContext } from "react";
export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        setUsername(localStorage.getItem("username"));
        console.log(username);
    }, [username]);

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserContextProvider;
