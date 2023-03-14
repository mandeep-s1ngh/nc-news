import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header";
import HomeImg from "./components/homeImg";
import NavBar from "./components/navBar";
import ArticleList from "./components/articleList";

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomeImg />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/topics" />
      </Routes>
    </div>
  );
}

export default App;
