import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchArticleById } from "../api";

function SingleArticle() {
  const { article_id } = useParams();
  const [article, setArticle] = useState([]);
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

  return (
    <section className="tile" key={article.article_id}>
      <img src={article.article_img_url} alt="article img"></img>
      <h1>{article.title}</h1>
      <p className="date">Posted: {article.created_at.substring(0, 10)}</p>
      <p className="author">Author: {article.author}</p>
      <p>{article.body}</p>
      <p className="votes">Votes: {article.votes}</p>
    </section>
  );
}

export default SingleArticle;
