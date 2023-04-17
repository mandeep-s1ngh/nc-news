import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import HomeImg from "./components/homeImg";
import NavBar from "./components/navBar";
import ArticleList from "./components/articleList";
import SingleArticle from "./components/singleArticle";
import ArticleComments from "./components/articleComments";
import TopicsList from "./components/topicsList";
import ArticlesByTopic from "./components/articlesByTopic";

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeImg />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
        <Route
          path="/articles/:article_id/comments"
          element={<ArticleComments />}
        />
        <Route path="/topics" element={<TopicsList />} />
        <Route path="/topics/:topic" element={<ArticlesByTopic />} />
      </Routes>
    </div>
  );
}

export default App;
