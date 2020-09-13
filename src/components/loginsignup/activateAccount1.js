import React, { useState, useEffect } from "react";
import axios from "axios";

function ActivateAccount(props) {
  const { history } = props;
  const { token } = props.match.params;
  const [success, setSuccess] = useState();
  const [message, setMessage] = useState("");

  const displayMessage = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post(
        `/auth/activate/${token}`
      )
      setSuccess(response.data.success);
      setMessage(response.data.message);
    } catch (err) {
      setSuccess(err.response.data.success);
      setMessage(err.response.data.message);
    }
  };

  useEffect(() => {
    displayMessage();
  }, []);

  const SuccessDiv = () => {
    return (
      <>
        <div>{message}</div>
        <button onClick={() => history.push("/signin")}>login</button>
      </>
    );
  };
  const FailDiv = () => {
    return (
      <>
        <div>{message}</div>

        <button onClick={() => history.push("/signup")}>signup</button>
      </>
    );
  };
  
  return (
    <div className="activate-account-main">
      <div className={`activate-account ${success}`}>
        {success && SuccessDiv()}
        {!success && FailDiv()}
      </div>
    </div>
  );
}

export default ActivateAccount;
