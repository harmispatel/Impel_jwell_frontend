import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { Helmet } from "react-helmet-async";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";
import Logo from "../../assets/images/logo.png";

const DealerLogin = () => {
  const recaptcha = useRef();

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [passwordType, setPasswordType] = useState("password");

  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [captcha, setCaptcha] = useState("");

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const togglePassword = (e) => {
    e.preventDefault();
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const captchaValue = recaptcha?.current?.getValue();
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
    if (!captchaValue) {
      setCaptcha("Please verify the reCAPTCHA!");
      return;
    }
    setError(null);
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
        "https://admin.impel.store/api/user-login",
        userData
      )
      .then((response) => {
        if (response?.data?.success === true) {
          setUser(response?.data);
          localStorage.setItem("isLogin", true);
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("user_id", response.data.data.user.id);
          localStorage.setItem("user_type", response.data.data.user.user_type);
          localStorage.setItem("email", loginData.email);
          localStorage.removeItem("showPopup");
          navigate("/");
        } else {
          navigate("/Dealer_login");
          toast.error(response?.data?.message);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setSpinner(false);
      });
  };

  const onCaptchaChange = () => {
    setCaptcha("");
  };
  return (
    <>
      <Helmet>
        <title>Impel Store - Dealer Login</title>
      </Helmet>
      <section className="login">
        <div className="container">
          <div className="">
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div className="login_detail">
                  <div className="text-center">
                    <img src={Logo} alt="logo" />
                  </div>
                  <h2>Dealer Login</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        name="email"
                        onChange={(e) => handleChange(e)}
                        placeholder="Registered Email ID"
                        className="form-control"
                        autoComplete="off"
                      />
                      {error && error === "Please enter your email." && (
                        <span
                          className="text-danger"
                          style={{ fontWeight: "600" }}
                        >
                          {error}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <div className="position-relative">
                        <input
                          type={passwordType}
                          name="password"
                          onChange={(e) => handleChange(e)}
                          placeholder="Password"
                          className="form-control"
                          autoComplete="off"
                        />
                        <span
                          className="toggle_btn"
                          onClick={(e) => togglePassword(e)}
                        >
                          {passwordType === "password" ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )}
                        </span>
                      </div>
                      {error && error === "Please enter your password." && (
                        <span
                          className="text-danger"
                          style={{ fontWeight: "600" }}
                        >
                          {error}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 d-flex align-items-center justify-content-center">
                      <ReCAPTCHA
                        ref={recaptcha}
                        sitekey="6Lc7Em0pAAAAAHHha3qWzytW6qKfkBqh8ResnmfR"
                        onChange={onCaptchaChange}
                      />
                    </div>
                    <div className="text-center fw-bolder">
                      {captcha && (
                        <span className="text-danger">{captcha}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <button className="dealer_login_btn">
                        {spinner && (
                          <CgSpinner size={20} className="animate_spin me-2" />
                        )}
                        {spinner ? "" : "Login"}
                      </button>
                      <div className="d-flex align-items-center justify-content-between">
                        <p className="text-start">
                          <Link
                            to="/forget-password"
                            className="text-decoration-none text-danger"
                          >
                            Forgot Password?
                          </Link>
                        </p>
                        <p>
                          <Link
                            to="/login"
                            className="text-decoration-none text-success"
                          >
                            Customer Login?
                          </Link>
                        </p>
                      </div>
                    </div>
                  </form>
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
