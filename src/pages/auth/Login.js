import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { useEffect } from "react";
import { auth } from "./FirebaseConfig";
import { RecaptchaVerifier } from "firebase/auth";
import PhoneInput from "react-phone-number-input";

const Login = () => {
  const [phoneNumber,setPhoneNumber] = useState("")
  const [error,setError] = useState("")
  
  const getOtp = (e) =>{
    e.preventDefault()

    console.log(phoneNumber);
  }
  
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
                        <div className="login_header">
                          <Link to="#">
                            <img src={Logo} height="80" alt="logo" />
                          </Link>
                        </div>
                        <div className="login_info_inr_title">
                          <h3>Welcome</h3>
                        </div>
                        <form onSubmit={getOtp}>
                          <div className="form-group my-3">
                            <PhoneInput
                              defaultCountry="IN"
                              value={phoneNumber}
                              onChange={setPhoneNumber}
                              placeholder="Enter Your Phone Number"
                            />
                            <button
                              id="sign-in-button"
                              type="submit"
                              className="btn btn-primary"
                            >
                              Send OTP
                            </button>
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
  );
};

export default Login;
