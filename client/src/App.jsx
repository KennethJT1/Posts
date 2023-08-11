/* eslint-disable react/jsx-key */
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:6891/posts")
      .then((resp) => {
        setListOfPosts(resp.data);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  }, []);
  return (
    <div className="App">
      {listOfPosts.map((value, key) => {
        return (
          <div className="post">
            <div className="title">{value.title}</div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
