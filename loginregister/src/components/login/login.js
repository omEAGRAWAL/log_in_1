import React from "react";
import "./login.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = ({ setLoginUser }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const login = async () => {
    axios.post("http://localhost:9002/login", user).then((res) => {
      alert(res.data.message);
      setLoginUser(res.data.user);
      navigate("/");
    });
  };

  return (
    <div className="login">
      <h1>hello Login</h1>
      <input
        type="text"
        placeholder="username"
        name="email"
        value={user.email}
        onChange={handleChange}
      ></input>
      <input
        type="password"
        placeholder="password"
        name="password"
        value={user.password}
        onChange={handleChange}
      ></input>
      <div className="button" onClick={login}>
        Login
      </div>
      <div>or</div>

      <div className="button" onClick={() => navigate("/register")}>
        Register
      </div>
    </div>
  );
};

export default Login;
