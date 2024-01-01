import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { Helmet } from "react-helmet-async";

const DealerLogin = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [spinner, setSpinner] = useState(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError(null);
    setIsSubmitting(true);

    if (!loginData.email) {
      setError("Please enter your email.");
      return;
    }

    if (!loginData.password) {
      setError("Please enter your password.");
      return;
    }
    setIsSubmitting(true);
    setSpinner(true);
    let formdata = new FormData();
    formdata.append("email", loginData.email);
    formdata.append("password", loginData.password);

    const userData = {
      email: loginData.email,
      password: loginData.password,
    };

    axios
      .post(
        "https://harmistechnology.com/admin.indianjewelley/api/user-login",
        userData
      )
      .then((response) => {
        if (response.data.success === true) {
          setUser(response.data);
          localStorage.setItem("isLogin", true);
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("user_id", response.data.data.user.id);
          localStorage.setItem("user_type", response.data.data.user.user_type);
          localStorage.setItem("email", loginData.email);
          navigate("/");
        } else {
          navigate("/Dealer_login");
          toast.error(response.data.message);
          setUser("");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSpinner(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>Impel Store - Dealer Login</title>
      </Helmet>
      <section className="login">
        <div className="login_main">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-9">
                <div className="login_inr">
                  <div className="row justify-content-center">
                    <div className="col-md-8">
                      <div className="login_info">
                        <div className="delivery_info_inr">
                          {/* <div className="login_header">
                          <Link to="#">
                            <img src={Logo} height="80" alt="logo" />
                          </Link>
                        </div> */}
                          <div className="delivery_login_info_inr_title">
                            <h3>Welcome</h3>
                          </div>
                          <form onSubmit={handleSubmit}>
                            <div className="form-group my-3">
                              <input
                                className="form-control"
                                type="text"
                                name="email"
                                onChange={(e) => handleChange(e)}
                                placeholder="Registered Email ID"
                              />
                              {error &&
                                error === "Please enter your email." && (
                                  <p className="text-danger">{error}</p>
                                )}
                            </div>
                            <div className="form-group my-3">
                              <input
                                className="form-control"
                                type="password"
                                name="password"
                                onChange={(e) => handleChange(e)}
                                placeholder="Password"
                              />
                              {error &&
                                error === "Please enter your password." && (
                                  <p className="text-danger">{error}</p>
                                )}
                            </div>

                            <div className="form-group mt-4 mb-0">
                              <button type="submit" className="btn login_bt">
                                {spinner && (
                                  <CgSpinner
                                    size={20}
                                    className="animate_spin me-2"
                                  />
                                )}
                                {spinner ? "" : "Login"}
                              </button>
                              <div className="d-flex justify-content-between">
                                <Link
                                  to="/forget-password"
                                  className="text-decoration-none"
                                >
                                  Forgot Credentials?
                                </Link>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default DealerLogin;
