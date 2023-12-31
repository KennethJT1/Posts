import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/auth";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  let navigate = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuth({
          username: response.data.username,
          id: response.data.id,
          status: true,
        });
        navigate("/");
      }
    });
  };
  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />

      <button onClick={login}> Login </button>
    </div>
  );
};
