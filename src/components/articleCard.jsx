function ArticleCard(props) {
  const { articleInfo } = props;

  return articleInfo.map((article) => {
    return (
      <section className="tile" key={article.article_id}>
        <img src={article.article_img_url} alt="article img"></img>
        <h1>{article.title}</h1>
        <p className="date">{article.created_at.substring(0, 10)}</p>
        <p>{article.body}</p>
      </section>
    );
  });
}

export default ArticleCard;
