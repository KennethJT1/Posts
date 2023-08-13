import "./App.css";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { CreatePost } from "./pages/CreatePost";
import { Post } from "./pages/Post";
import { useAuth } from "./context/auth";
import { PageNotFound } from "./pages/PageNotFound";
import { Registration } from "./pages/Registration";
import { Login } from "./pages/Login";
import { Profile } from "./pages/Profile";
import { ChangePassword } from "./pages/ChangePassword";

function App() {
  const [auth, setAuth] = useAuth();

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuth({ username: "", id: 0, status: false });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div className="navbar">
          <div className="links">
            {!auth.status ? (
              <>
                <Link to="/login"> Login</Link>
                <Link to="/registration"> Registration</Link>
              </>
            ) : (
              <>
                <Link to="/"> Home Page</Link>
                <Link to="/create-post"> Create A Post</Link>
              </>
            )}
          </div>
          <div className="loggedInContainer">
            <h1>{auth.username} </h1>
            {auth.status && <button onClick={logout}> Logout</button>}
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
