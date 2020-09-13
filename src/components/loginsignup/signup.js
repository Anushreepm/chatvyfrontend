import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function Signup() {
  const [username, setuserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const obj = {
      username: username,
      email: email,
      password: password,
    };
    checkSignup(obj);
    setuserName("");
    setEmail("");
    setPassword("");
    setconfirmPassword("");
  };

  const checkSignup = async (obj) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/auth/signup", obj, config);
     
      setSuccess(res.data.success);
      setMessage(res.data.message);
      displayMessage();
    } catch (err) {
   
      setSuccess(err.response.data.success);
      setMessage(err.response.data.message);
      displayMessage();
      return err;
    }
  };

  const displayMessage = () => {
    if (success) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
  };

  useEffect(() => {
    if (success) {
      toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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

      <div className="signup-page">
        <a href="/">
          <img src="/home.png" alt="homepage" />
        </a>
        <div className="login-header">Enter details for Signup</div>
        <form onSubmit={handleSubmit} className="signup-container">
          <div class="form-group">
            <label for="exampleInputName1">User Name</label>
            <input
              type="User Name"
              class="form-control"
              id="exampleInputName1"
              placeholder="Enter your Name"
              value={username}
              onChange={(e) => setuserName(e.target.value)}
              required
            />
          </div>
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
              required
            />
            {/* <small id="emailHelp" class="form-text text-muted">
            We'll never share your email with anyone else.
          </small> */}
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
          <div class="form-group">
            <label for="exampleInputPassword1">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Enter your Password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
            />
          </div>
          <div className="signin-button">
            <button type="submit" class="btn btn-primary">
              Signin
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
