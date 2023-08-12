import axios from "axios";
import { useState, createContext, useContext,useEffect } from "react";
const baseURL = import.meta.env.VITE_BASE_URL

const AuthContext  = createContext();

const AuthProvider = ({ children}) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ""
    });

    // axios config
    axios.defaults.baseURL = baseURL
    axios.defaults.headers.common["Authorization"] = auth?.token;

    //useEffect is to retain the data from auth which can be accessible by all component 
    useEffect(()=> {
        const data = localStorage.getItem("auth");
        if(data) {
            const parsed = JSON.parse(data);
            setAuth({...auth, user: parsed.user, token:parsed.token })
        }
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>{children}</AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider}