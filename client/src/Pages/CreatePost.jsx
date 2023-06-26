import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate } from "react-router-dom";
const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];
function CreatePost() {
  const [titles, setTitles] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect,setRedirect]=useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const createNewPost = async (e) => {
    e.preventDefault();
    const data=new FormData();
    data.set("title",titles);
    data.set("summary", summary);
    data.set("content",content);
    data.set("file",files[0])
    const response=await fetch(`${apiUrl}/post`,{
        method:"POST",
        body:data,
        credentials:"include",
    })
    if(response.ok){
        setRedirect(true);
    }
  };
  if(redirect){
    return <Navigate to={"/"}/>
  }
  return (
    <form onSubmit={createNewPost}>
      <input
        type="title"
        placeholder="Title"
        value={titles}
        onChange={(e) => setTitles(e.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
      />
      <input
        type="file"
        onChange={(e) => setFiles(e.target.files)}
      />
      <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        onChange={(newValue) => setContent(newValue)}
      />
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
}

export default CreatePost;
