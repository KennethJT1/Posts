import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/posts")
      .then((resp) => {
        setListOfPosts(resp.data);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  }, []);

  return (
    <div>
      {listOfPosts.map((value, key) => {
        return (
          <div key={key}
            className="post"
            onClick={() => {
              navigate(`/post/${value.id}`);
            }}
          >
            <div className="title">{value.title}</div>
            <div className="body">{value.postText}</div>
            <div className="footer">{value.username}</div>
          </div>
        );
      })}
    </div>
  );
};
