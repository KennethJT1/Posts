import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";
const baseURL = import.meta.env.VITE_BASE_URL;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    username: "",
    id: 0,
    status: false,
  });

  axios.defaults.baseURL = baseURL;

  useEffect(() => {
    axios
      .get("/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuth({ ...auth, status: false });
        } else {
          setAuth({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
