import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

function EditPost() {
  const [titles, setTitles] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect,setRedirect]=useState(false);
  const {id}=useParams();
   
  useEffect(()=>{
    fetch(`http://localhost:8000/post/${id}`).then((response)=>{
        return response.json();
    }).then((postInfo)=>{
        setTitles(postInfo.title)
        setContent(postInfo.content);
        setSummary(postInfo.summary);
    })
  },[])
  const updatePost=async(e)=>{
    e.preventDefault();
    const data=new FormData();
    data.set("title",titles);
    data.set("summary", summary);
    data.set("content",content);
    data.set("id",id);
    if(files?.[0])
    data.set("file",files?.[0])
    const response=await fetch("http://localhost:8000/post",{
        method:"PUT",
        body:data,
        credentials:'include',
    })
    if(response.ok)
    setRedirect(true)
  }
  if(redirect){
    return <Navigate to={`/post/${id}`}/>
  }
  return (
    <form onSubmit={updatePost}>
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
      <input type="file" onChange={(e) => setFiles(e.target.files)} />
      <ReactQuill
        value={content}
        modules={modules}
        formats={formats}
        onChange={(newValue) => setContent(newValue)}
      />
      <button style={{ marginTop: "5px" }}>Update Post</button>
    </form>
  );
}

export default EditPost;
