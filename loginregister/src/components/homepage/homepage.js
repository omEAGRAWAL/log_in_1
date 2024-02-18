import React from "react";
import "./homepage.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <h1>hello Home Page</h1>

      <div className="button" onClick={() => navigate("/login")}>
        Logout
      </div>
    </div>
  );
};

export default HomePage;
