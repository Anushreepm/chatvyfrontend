import React, { useState, useEffect } from "react";
import jwt from "jsonwebtoken";
import Layout from "./Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reset = ({ match }) => {
  // props.match from react router dom
  const [values, setValues] = useState({
    name: "",
    token: "",
    newPassword: "",
    buttonText: "Reset password",
  });

  useEffect(() => {
    let token = match.params.token;
    let { name } = jwt.decode(token);
    // console.log(name);
    if (token) {
      setValues((v) => ({ ...v, name, token }));
    }
  }, [match.params.token]);

  const { name, token, newPassword, buttonText } = values;

  const handleChange = (event) => {
    setValues({ ...values, newPassword: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios
      .post("/auth/reset-password", { newPassword, resetPasswordLink: token })
      .then((response) => {
        toast.success(response.data.message);
        setValues({ ...values, buttonText: "Done" });
      })
      .catch((error) => {
        toast.error(error.response.data.error);
        setValues({ ...values, buttonText: "Reset password" });
      });
  };

  const passwordResetForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">New Password</label>
        <input
          onChange={handleChange}
          value={newPassword}
          type="password"
          className="form-control"
          placeholder="Type new password"
          required
        />
      </div>

      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  return (
    <div className="login-page">
      <ToastContainer />
      <h1 className="p-5 text-center">Hey {name}, Type your new password</h1>
      {passwordResetForm()}
    </div>
  );
};

export default Reset;
