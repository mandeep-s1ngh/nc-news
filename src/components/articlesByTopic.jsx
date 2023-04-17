import { Link } from "react-router-dom";
import { fetchArticles } from "../api";
import { useParams } from "react-router";
import { useEffect, useState } from "react";

function ArticlesByTopic() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const { topic } = useParams();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchArticles()
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
        const articlesByTopic = articles.filter(
          (article) => article.topic === topic
        );
        setArticles(articlesByTopic);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, [topic]);

  if (isLoading) return <p>🥁 Loading!!!!</p>;

  if (isError) return <p>❌ Error Fetching Information</p>;

  return (
    <>
      <section>
        {articles.map((item) => {
          return (
            <section className="tile" key={item.article_id}>
              <Link to={`/articles/${item.article_id}`}>
                <img src={item.article_img_url} alt="article img"></img>
                <h1>{item.title}</h1>
              </Link>
              <p className="author">Author: {item.author}</p>
              <p className="date">{item.created_at.substring(0, 10)}</p>
            </section>
          );
        })}
      </section>
    </>
  );
}

export default ArticlesByTopic;
