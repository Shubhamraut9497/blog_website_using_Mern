import React, { useState, useEffect } from "react";
import Post from "../components/Post";

function IndexPage() {
  const [posts, setPosts] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/post`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((posts) => {
        console.log(posts);
        setPosts(posts);
        setLoading(false);
      });
  }, []);

  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => (
          <Post key={post._id} {...post} loading={loading} />
        ))}
    </>
  );
}


export default IndexPage;
