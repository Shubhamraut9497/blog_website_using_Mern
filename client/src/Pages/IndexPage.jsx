import React, { useState, useEffect } from "react";
import Post from "../components/Post";
import Skeleton from "react-loading-skeleton";

function IndexPage() {
  const [posts, setPosts] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchedData = async () => {
      setLoading(true);
      await fetch(`${apiUrl}/post`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((posts) => {
          setLoading(false);
          console.log(posts);
          setPosts(posts);
        });
    };
    fetchedData();
  }, []);

  if (loading) {
    return (
      <>
        {Array.from({ length: posts.length }, (_, index) => (
          <div className="post-loading-wrapper" key={index}>
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
        ))}
      </>
    );
  }

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
