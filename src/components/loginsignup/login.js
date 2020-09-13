import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { authenticate, isAuth } from "./utils/helper";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout";
import axios from "axios";

function Login(props) {
  const { history } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // checkLogin(obj);
    const obj = {
      email: email,
      password: password,
    };
    checkLogin(obj);
    
    setEmail("");
    setPassword("");
  };

  const checkLogin = async (obj) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post(
        "http://localhost:5000/auth/signin",
        obj,
        config
      );
      // console.log(res.data);

      setSuccess(res.data.success);
      setMessage(res.data.message);
      displayMessage();
    } catch (err) {
      console.log(err.response.data);
      setSuccess(err.response.data.success);
      setMessage(err.response.data.message);
      displayMessage();
      return err;
    }
  };

  const displayMessage = () => {
    if (success === false) {
      if (message !== "") {
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  useEffect(() => {
    if (success) {
      history.push("/join");
    } else if (success === false) {
      if (message !== "") {
        toast.error(message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }, [success, message]);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="login-page">
        <a href="/">
          <img src="/home.png" alt="homepage" />
        </a>

        <div className="login-header">Enter details for login</div>
        <form onSubmit={handleSubmit} className="signin-container">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="forgot-password">
            <a
              href="http://localhost:3000/auth/forgot-password"
              target="_blank"
            >
              forgot password ?
            </a>
          </div>
          <div className="signin-button">
            <button type="submit" class="btn btn-primary">
              Signin
            </button>
          </div>
        </form>
        <br />
        {/* <Link
          to="http://localhost:3000/auth/password/forgot"
          className="btn btn-sm btn-outline-danger"
        >
          Forgot Password
        </Link> */}
      </div>
    </>
  );
}

export default Login;
