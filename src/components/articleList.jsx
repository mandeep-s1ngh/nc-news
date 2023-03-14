import { useEffect, useState } from "react";
import { fetchArticles } from "../api";
import ArticleCard from "./articleCard";

const ArticleList = () => {
  const [articleInfo, setArticleInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    fetchArticles()
      .then((articles) => {
        setArticleInfo(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  if (isLoading) return <p>🥁 Loading!!!!</p>;

  if (isError) return <p>❌ Error Fetching Information</p>;

  return <ArticleCard articleInfo={articleInfo} />;
};

export default ArticleList;
