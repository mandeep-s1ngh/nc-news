import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleById, patchArticle } from "../api";
import ArticleComments from "./articleComments";

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
  const [showComments, setShowComments] = useState(false);
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
      <p className="date">Posted: {article.created_at.substring(0, 10)}</p>
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
      <button type="button" onClick={() => setShowComments(true)}>
        💬 Show Comments
      </button>
      {showComments ? <ArticleComments /> : null}
      <button type="button" onClick={() => setShowComments(false)}>
        🫣 Hide Comments
      </button>
    </section>
  );
}

export default SingleArticle;
