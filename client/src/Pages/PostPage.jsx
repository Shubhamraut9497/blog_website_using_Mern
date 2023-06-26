import { format } from "date-fns";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function PostPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/post/${id}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((postData) => {
        setPostInfo(postData);
      });
  }, []);

  if (!postInfo) {
    return "";
  }

  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
       <time>{format(new Date(postInfo.createdAt), "MMM d yyyy HH:mm")}</time>
       <div className="author">by {postInfo.author.username}</div>
      <div className="image">
        <img src={`http://localhost:8000/${postInfo?.cover}`} alt="img" />
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
}

export default PostPage;
