import axios from "axios";

const newsAPI = axios.create({
  baseURL: "https://nc-news-api-e6xe.onrender.com/api",
});

export const fetchArticles = () => {
  return newsAPI.get("/articles").then(({ data }) => {
    return data.articles;
  });
};

export const fetchArticleById = (article_id) => {
  let path = `/articles/${article_id}`;
  return newsAPI.get(path).then(({ data }) => {
    return data.article;
  });
};

export const fetchComments = (article_id) => {
  let path = `/articles/${article_id}/comments`;
  return newsAPI.get(path).then(({ data }) => {
    return data.comments;
  });
};
