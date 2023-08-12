import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const Post = () => {
  const { id } = useParams();

  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((resp) => {
        setPost(resp.data);
      })
      .catch((err) => {
        console.log("error", err.message);
      });

    axios
      .get(`/comments/${id}`)
      .then((resp) => {
        setComments(resp.data);
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  }, []);

  const addComment = () => {
    axios
      .post(`/comments`, {
        commentBody: newComment,
        postId: id,
      })
      .then((resp) => {
        const newAddComment = { commentBody: newComment };
        setComments([...comments, newAddComment]);
        setNewComment("");
      })
      .catch((err) => {
        console.log("error", err.message);
      });
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="title">{post.title}</div>
        <div className="postText">{post.postText}</div>
        <div className="footer">{post.username}</div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(e) => {
              setNewComment(e.target.value);
            }}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((c, i) => {
            return (
              <div className="comment" key={i}>
                {c.commentBody}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
