import React, { useState } from "react";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    const api = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if(api.status===200){
      alert("Registration Successul");
    }
    else{
      alert("Registration failed");
    }
  };
  return (
    <form className="login" onSubmit={submitForm}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder='"password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button>Register</button>
    </form>
  );
}

export default RegisterPage;
