import { Link } from "react-router-dom";

function ArticleCard(props) {
  const { articleInfo } = props;

  return articleInfo.map((article) => {
    return (
      <section className="tile" key={article.article_id}>
        <img src={article.article_img_url} alt="article img"></img>
        <Link to={`/articles/${article.article_id}`}>
          <h1>{article.title}</h1>
        </Link>
        <p className="date">{article.created_at.substring(0, 10)}</p>
      </section>
    );
  });
}

export default ArticleCard;
