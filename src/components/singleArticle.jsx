import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleById, patchArticle, fetchComments } from "../api";
import ArticleComments from "./articleComments";
import CommentForm from "./commentForm";

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const [userVote, setUserVote] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchArticleById(article_id)
      .then((data) => {
        setArticle(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [article_id]);

  useEffect(() => {
    fetchComments(article_id)
      .then((data) => {
        setCommentsCount(data.length);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [article_id]);

  if (isLoading) return <p>🥁 Loading!!!!</p>;

  if (isError) return <p>❌ Error Fetching Information</p>;

  const onClick = (votes) => {
    setUserVote((userVote) => {
      setIsError(null);
      return userVote + votes;
    });
    patchArticle(article_id, votes).catch((err) => {
      setIsError("❌ Something went wrong, please try again");
    });
  };

  return (
    <section className="tile" key={article.article_id}>
      <img src={article.article_img_url} alt="article img"></img>
      <h1>{article.title}</h1>
      <p className="date">
        Posted: {new Date(article.created_at).toLocaleDateString("en-GB")}
      </p>
      <p className="author">Author: {article.author}</p>
      <p>{article.body}</p>
      {isError ? <p>{isError}</p> : null}
      <button
        type="button"
        onClick={() => {
          onClick(1);
        }}
        disabled={userVote !== 0}
      >
        ❤️ {article.votes + userVote}
      </button>
      <button
        type="button"
        onClick={() => {
          onClick(-1);
        }}
        disabled={userVote !== 0}
      >
        👎
      </button>
      <br></br>
      <br></br>
      <CommentForm article_id={article_id} />
      <br></br>
      <br></br>
      <p>Number of comments: {commentsCount}</p>
      <ArticleComments />
    </section>
  );
}

export default SingleArticle;
