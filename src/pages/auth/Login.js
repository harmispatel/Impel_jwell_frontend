import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import OTPInput from "react-otp-input";
import firebase from "./firebase.config";

import {
  RecaptchaVerifier,
  getAuth,
  signInWithPhoneNumber,
} from "firebase/auth";
import axios from "axios";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [show, setShow] = useState(false);
  const [phoneError, setPhoneError] = useState();
  const [spinner, setSpinner] = useState(false);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const [phonedata, setPhoneData] = useState();

  const handlePhoneNumberChange = (newPhoneNumber) => {
    let isValid = true;
    if (!newPhoneNumber) {
      setPhoneError("Please enter your mobile");
      isValid = false;
    } else if (newPhoneNumber.length !== 13) {
      setPhoneError("Your mobile number should be 10 digits");
      isValid = false;
    } else {
      setPhoneError("");
    }
    setPhoneNumber(newPhoneNumber);
    return isValid;
  };

  function onCaptchVerify() {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
      size: "invisible",
      callback: (response) => {
        sendOtp();
      },
      "expired-callback": () => {},
    });
  }

  const sendOtp = (e) => {
    e.preventDefault();
    if (!phoneNumber) {
      setPhoneError("Please enter your mobile");
    } else if (phoneNumber.length !== 13) {
      setPhoneError("Your mobile number should be 10 digits");
    } else {
      setPhoneError("");
      const formatPh = `${phoneNumber}`;
      const appVerifier = window.recaptchaVerifier;
      setSpinner(true);
      axios
        .post("https://harmistechnology.com/admin.indianjewelley/api/login", {
          phone: formatPh,
        })
        .then((res) => {
          const response = res.data;
          if (response.status === 0) {
            toast.error(response.message);
            navigate("/login");
            setTimeout(() => {
              window.location.reload(true);
            }, 1000);
            return;
          } else {
            const auth = getAuth();
            signInWithPhoneNumber(auth, formatPh, appVerifier)
              .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                toast.success("OTP sent successfully!");
                setPhoneData(res.data);
                setShow(true);
              })
              .catch((err) => {
                console.log(err);
                setTimeout(() => {
                  window.location.reload(true);
                }, 2000);
              })
              .finally(() => {
                setSpinner(false);
              });
          }
        })
        .catch((err) => {
          console.log(err);
          setSpinner(false);
        });
    }
  };

  const resendOTP = (e) => {
    e.preventDefault();
    if (window.recaptchaVerifier) {
      const appVerifier = window.recaptchaVerifier;

      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then((confirmationResult) => {
          console.log(confirmationResult);
          window.confirmationResult = confirmationResult;
          console.log("OTP has been resent");
        })
        .catch((error) => {
          // Error; SMS not sent
          console.log(error);
          console.log("SMS not sent");
        });
    } else {
      console.error("recaptchaVerifier not defined");
    }
  };

  const handleOtpVerification = (e) => {
    setSpinner(true);
    e.preventDefault();
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        if (result) {
          toast.success("Login Successfully...");
          localStorage.setItem("phone", phoneNumber);
          localStorage.setItem("user_type", phonedata?.user_type);
          localStorage.setItem("user_id", phonedata?.user_id);
          localStorage.setItem("verification", phonedata?.verification);
          const redirectPath = localStorage.getItem("redirectPath");
          localStorage.removeItem("redirectPath");
          localStorage.removeItem("showPopup");
          navigate(redirectPath || "/");
        }
      })
      .catch((error) => {
        toast.error("Verification failed");
        setOtp("");
      })
      .finally(() => {
        setSpinner(false);
      });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  useEffect(() => {
    onCaptchVerify();
  }, []);

  return (
    <>
      <Helmet>
        <title>Impel Store - Login</title>
      </Helmet>
      <section className="login">
        <div class="container">
          <div className="">
            <div class="row justify-content-center">
              <div className="col-md-5">
                <div className="login_detail">
                  <div id="recaptcha-container">
                    {show === false && (
                      <>
                        <form onSubmit={sendOtp}>
                          <h2>Customer Login</h2>
                          <div className="my-3 user-login-form">
                            <PhoneInput
                              international
                              defaultCountry="IN"
                              countryCallingCodeEditable={false}
                              className="form-control"
                              name="phoneNumber"
                              value={phoneNumber}
                              onChange={handlePhoneNumberChange}
                              placeholder="Enter Your Phone Number"
                              maxLength={16}
                            />
                            {phoneError && (
                              <div className="text-danger">{phoneError}</div>
                            )}
                          </div>
                          <div className="row">
                            <div className="col-md-12">
                              <button
                                className="btn btn-success dealer_login_btn fw-bolder"
                                style={{ fontSize: "18px" }}
                                id="sign-in-button"
                                disabled={spinner}
                              >
                                {spinner && (
                                  <CgSpinner
                                    size={20}
                                    className="animate_spin text-center mx-2"
                                    role="button"
                                  />
                                )}
                                {spinner ? "" : "Login "}
                              </button>
                            </div>
                          </div>
                          <div className="col-md-12 text-end">
                            <Link
                              to="/Dealer_login"
                              className="text-decoration-none text-success"
                              style={{ fontWeight: "700", fontSize: "18px" }}
                            >
                              Dealer Login ?
                            </Link>
                          </div>
                        </form>
                      </>
                    )}

                    {show === true && (
                      <>
                        <form onSubmit={handleOtpVerification}>
                          <h2>Enter OTP</h2>
                          <div className="form-group my-3 otp_box">
                            <OTPInput
                              value={otp}
                              className="form-control"
                              onChange={setOtp}
                              shouldAutoFocus={true}
                              numInputs={6}
                              renderSeparator={<span>-</span>}
                              renderInput={(props) => (
                                <input
                                  {...props}
                                  type="tel"
                                  inputMode="numeric"
                                />
                              )}
                            />
                          </div>
                          <div className="d-flex justify-content-between">
                            <button
                              id="sign-in-button"
                              type="button"
                              onClick={resendOTP}
                              // disabled={seconds > 0 || minutes > 0}
                              className="btn btn-success user_login_btn"
                            >
                              RESEND
                            </button>
                            {/* {seconds > 0 || minutes > 0 ? (
                              <p>
                                Time Remaining:
                                {minutes < 10 ? `0${minutes}` : minutes}:
                                {seconds < 10 ? `0${seconds}` : seconds}
                              </p>
                            ) : (
                              <p>Didn't recieve code?</p>
                            )} */}
                            <button
                              id="sign-in-button"
                              type="submit"
                              className="btn btn-success user_login_btn"
                              disabled={otp?.length < 6}
                            >
                              {spinner && (
                                <CgSpinner
                                  size={20}
                                  className="animate_spin text-center mx-3"
                                />
                              )}
                              {spinner ? "" : "VERIFY"}
                            </button>
                          </div>
                        </form>
                      </>
                    )}
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

export default Login;
