import { createContext, useState, useEffect } from "react";
import api from "../api";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Refresh par user check karo
    useEffect(() => {
        const checkUser = async () => {
            try {
                const res = await api.get("/profile");
                setUser(res.data);
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkUser();
    }, []);

    const loginUser = (userData) => {
        setUser(userData);
        // Note: Token cookie mein save ho gaya hai, localStorage ki zaroorat nahi
    };

    const logoutUser = async () => {
        await api.post("/logout");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};