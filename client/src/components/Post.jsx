import React from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
function Post({ _id, title, summary, cover, createdAt, author, loading }) {
  const apiUrl = process.env.REACT_APP_API_URL;
  if (loading) {
    return (
      <div className="post-loading-wrapper">
        <div className="post-loading">
          <div className="image">
            <Skeleton
              width="100%"
              height={200}
              style={{ marginBottom: "20px" }}
            />
          </div>
          <div className="texts">
            <Skeleton
              width="80%"
              height={24}
              style={{ marginBottom: "15px" }}
            />
            <div className="info">
              <Skeleton
                width="40%"
                height={16}
                style={{ marginRight: "10px" }}
              />
              <Skeleton width="30%" height={16} />
            </div>
            <Skeleton
              count={3}
              width="100%"
              height={16}
              style={{ marginBottom: "20px" }}
            />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={`${apiUrl}/` + cover} alt="img" />
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{format(new Date(createdAt), "MMM d yyyy HH:mm")}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}

export default Post;
