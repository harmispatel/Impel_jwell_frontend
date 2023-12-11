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
import CheckUser from "../../services/Auth";
import axios from "axios";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

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

  useEffect(() => {
    onCaptchVerify();
  }, []);
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
    setMinutes(1);
    setSeconds(30);
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
  const handleOtpVerification = (e) => {
    setSpinner(true);
    e.preventDefault();
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        if (result) {
          localStorage.setItem("phone", phoneNumber);
          toast.success("Login Successfully...");
          localStorage.setItem("user_type", phonedata?.user_type);
          localStorage.setItem("user_id", phonedata?.user_id);
          localStorage.setItem("verification", phonedata?.verification);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Verification failed:", error);
        toast.error("Verification failed");
        setOtp("");
      })
      .finally(() => {
        setSpinner(false);
      });
  };

  return (
    <section className="login">
      <div className="login_main">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-9">
              <div className="login_inr">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="login_info">
                      <div className="login_info_inr">
                        {/* <div className="login_header">
                          <Link to="#">
                            <img src={Logo} height="80" alt="logo" />
                          </Link>
                        </div> */}
                        <div className="login_info_inr_title">
                          <div className=" p-2 text-center">
                            <div className="login_info_inr_title">
                              <h3>Welcome</h3>
                            </div>
                          </div>
                        </div>
                        <div id="recaptcha-container">
                          {show === false && (
                            <>
                              <form onSubmit={sendOtp}>
                                <div className="form-group my-3">
                                  <PhoneInput
                                    international
                                    countryCallingCodeEditable={false}
                                    defaultCountry="IN"
                                    className="form-control phone_input"
                                    name="phoneNumber"
                                    value={phoneNumber}
                                    onChange={handlePhoneNumberChange}
                                    placeholder="Enter Your Phone Number"
                                  />
                                  {phoneError && (
                                    <div className="text-danger">
                                      {phoneError}
                                    </div>
                                  )}
                                </div>
                                <div className="row">
                                  <div className="col-md-6">
                                    <button
                                      className="button-60"
                                      role="button"
                                      type="submit"
                                      id="sign-in-button"
                                    >
                                      {spinner && (
                                        <CgSpinner
                                          size={20}
                                          className="animate_spin me-2"
                                        />
                                      )}
                                      Login
                                    </button>
                                  </div>
                                  <div className="col-md-6 text-end">
                                    <Link
                                      to="/Dealer_login"
                                      className="text-decoration-none"
                                      style={{
                                        color: "#db9662",
                                        "font-size": "15px !important",
                                      }}
                                    >
                                      Dealer Login ?
                                    </Link>
                                  </div>
                                </div>
                              </form>
                            </>
                          )}

                          {show === true && (
                            <>
                              <form onSubmit={handleOtpVerification}>
                                <div className="form-group my-3 otp_box">
                                  <OTPInput
                                    value={otp}
                                    className="form-control"
                                    onChange={setOtp}
                                    shouldAutoFocus={true}
                                    numInputs={6}
                                    renderSeparator={<span>-</span>}
                                    renderInput={(props) => (
                                      <input {...props} />
                                    )}
                                  />
                                </div>
                                <div className="d-flex justify-content-between">
                                  <button
                                    id="sign-in-button"
                                    type="submit"
                                    className="btn btn-outline-warning"
                                  >
                                    {spinner && (
                                      <CgSpinner
                                        size={20}
                                        className="animate_spin me-2"
                                      />
                                    )}
                                    Verfy OTP
                                  </button>
                                  <div>
                                    {seconds > 0 || minutes > 0 ? (
                                      <p>
                                        Time Remaining:{" "}
                                        {minutes < 10 ? `0${minutes}` : minutes}
                                        :
                                        {seconds < 10 ? `0${seconds}` : seconds}
                                      </p>
                                    ) : (
                                      <p>Didn't recieve code?</p>
                                    )}
                                  </div>
                                  <button
                                    id="sign-in-button"
                                    type="button"
                                    onClick={sendOtp}
                                    className="btn btn-outline-warning"
                                    disabled={seconds > 0 || minutes > 0}
                                  >
                                    Resend OTP
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
