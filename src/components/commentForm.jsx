import { useParams } from "react-router-dom";
import { useState } from "react";
import { postComment } from "../api";

function CommentForm() {
  const { article_id } = useParams();
  const [commentData, setCommentData] = useState({
    author: "",
    body: "",
  });
  const [comments, setComments] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setIsError(false);
    postComment(article_id, commentData)
      .then((commentFromApi) => {
        setIsLoading(false);
        setComments((prevComments) => [...prevComments, commentFromApi]);
        setCommentData({ author: "", body: "" });
        setIsSuccess(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCommentData({ ...commentData, [name]: value });
  };

  if (isLoading) return <p>🥁 Loading!!!!</p>;

  if (isError)
    return (
      <p>❌ Error Posting Comment! Please refresh the page & try again!</p>
    );

  if (isSuccess) {
    return <p>✅ Comment posted successfully! Please refresh the page!</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          placeholder="Enter valid username"
          name="author"
          value={commentData.author}
          onChange={handleInputChange}
          style={{ marginBottom: "10px" }}
          required
        />
      </label>
      <br />
      <label>
        <textarea
          name="body"
          placeholder="Enter your comment"
          rows={4}
          value={commentData.body}
          onChange={handleInputChange}
          style={{ width: "200px" }}
          required
        />
      </label>
      <br />
      <button type="submit">Add Comment</button>
    </form>
  );
}

export default CommentForm;
