import { Link } from "react-router-dom";

const TopicsList = () => {
  return (
    <div className="topics-list">
      <div className="topics-container">
        <Link to={"/topics/coding"}>
          <button>💻 Coding</button>
        </Link>
        <Link to={"/topics/cooking"}>
          <button>🍲 Cooking</button>
        </Link>
        <Link to={"/topics/football"}>
          <button>⚽️ Football</button>
        </Link>
      </div>
    </div>
  );
};

export default TopicsList;
