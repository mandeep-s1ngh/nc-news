import axios from "axios";

const newsAPI = axios.create({
  baseURL: "https://nc-news-api-e6xe.onrender.com/api",
});

export const fetchArticles = () => {
  return newsAPI.get("/articles").then(({ data }) => {
    return data.articles;
  });
};
