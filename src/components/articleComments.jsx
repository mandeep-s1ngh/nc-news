import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchComments } from "../api";

function ArticleComments() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchComments(article_id)
      .then((commentsFromApi) => {
        setComments(commentsFromApi.reverse());
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [article_id]);

  if (isLoading) return <p>🥁 Loading!!!!</p>;

  if (isError) return <p>❌ Error Fetching Information</p>;

  return comments.map((comment) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const date = new Date(comment.created_at).toLocaleString("en-GB", options);

    return (
      <section className="comments" key={comment.comment_id}>
        <h1>
          {comment.author} 🗓<span>&nbsp;</span>
          <span className="date">{date}</span>
        </h1>
        <p>{comment.body}</p>
        <p>Votes: {comment.votes}</p>
        <p></p>
      </section>
    );
  });
}

export default ArticleComments;
