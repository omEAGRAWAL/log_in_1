import React from "react";
import "./register.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({
      ...user,
      [name]: value,
    });
  };

  const Register = async () => {
    const { name, email, password, password2 } = user;

    if (name && email && password && password === password2) {
      const response = await axios.post("http://localhost:9002/register", user);
    } else {
      alert("invalid");
    }
  };

  return (
    console.log(user),
    (
      <div className="register">
        <h1>hello Register</h1>
        <input
          type="text"
          name="name"
          value={user.name}
          placeholder="first name"
          onChange={handleChange}
        ></input>
        <input
          type="text"
          name="email"
          value={user.emial}
          placeholder="Email"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password"
          value={user.password}
          placeholder="Password"
          onChange={handleChange}
        ></input>
        <input
          type="password"
          name="password2"
          value={user.password2}
          placeholder="Password"
          onChange={handleChange}
        ></input>
        <div className="button" onClick={Register}>
          Register
        </div>
        <div>or</div>
        <div
          className="button"
          onClick={() => {
            navigate("/login");
          }}
        >
          Login
        </div>
      </div>
    )
  );
};

export default Register;
