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
        setComments(commentsFromApi);
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
    return (
      <section className="comments" key={comment.comment_id}>
        <h1>{comment.author}</h1>
        <p className="date">{comment.created_at.substring(0, 10)}</p>
        <p>{comment.body}</p>
        <b>Votes: {comment.votes}</b>
        <p></p>
      </section>
    );
  });
}

export default ArticleComments;
