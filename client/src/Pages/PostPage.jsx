import { format } from "date-fns";
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { UserContext } from "../userContext/userContext";
import {BiEdit} from 'react-icons/bi'
function PostPage() {
  const { id } = useParams();
  const [postInfo, setPostInfo] = useState(null);
  const {userInfo} =useContext(UserContext);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/post/${id}`, {
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
       {userInfo.id===postInfo.author._id && (
        <div className="edit-row">
            <Link to={`/edit/${postInfo._id}`} className="edit-btn"><BiEdit/>Edit this post</Link>
        </div>
       )} 
      <div className="image"> 
        <img src={`${apiUrl}/${postInfo?.cover}`} alt="img" />
      </div>
      <div className="content" dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
}

export default PostPage;
