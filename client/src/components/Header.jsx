import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext/userContext";


function Header() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const {setUserInfo,userInfo}=useContext(UserContext);
  useEffect(() => {
    fetch(`${apiUrl}/profile`, {
      credentials: "include",
    })
      .then((response) => {
        return response.json();
      })
      .then((userInfo2) => {
        setUserInfo(userInfo2);
      });
  }, []);
  const logout=()=>{
    fetch(`${apiUrl}/logout`,{
      credentials:"include",
      method:"POST",
    })
    setUserInfo(null);
  }
  const username=userInfo?.username;
  return (
    <header>
      <Link to="/" className="logo">
        My blog
      </Link>
      <nav>
        {username && (
          <>
            <Link to="/create">Create new Post </Link>
            <a onClick={logout} style={{cursor:"pointer"}} >Logout</a>
          </>
        )}
        {!username && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
