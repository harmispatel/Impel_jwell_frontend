import React, { useState } from "react";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    const existingEmails = JSON.parse(localStorage.getItem("emails")) || [];
    const newEmails = { email: email };
    const updatedEmails = [...existingEmails, newEmails];
    localStorage.setItem("emails", JSON.stringify(updatedEmails));
    setEmail("");
  };

  return (
    <section className="forget-password">
      <div className="container">
        <div className="row">
          <div>
            <head>
              <title>Forgot Password Form</title>
            </head>
            <h1>Forgot your password?</h1>
            <h3>Enter your email address to reset your password</h3>
            <form onSubmit={handlesubmit}>
              <label for="mail">Email</label>
              <input
                type="email"
                id="name"
                name="name"
                placeholder="Enter your email address"
                required
                value={email}
                onChange={(e) => handleChange(e)}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgetPassword;
