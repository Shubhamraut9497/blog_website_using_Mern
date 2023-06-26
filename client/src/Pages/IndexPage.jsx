import React, { useState, useEffect } from "react";
import Post from "../components/Post";

function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/post", {
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
      });
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <>
              <Post {...post} />
            </>
          );
        })}
    </>
  );
}

export default IndexPage;
