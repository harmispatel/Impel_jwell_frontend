import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const DealerLogIN = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useState([]);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          localStorage.setItem("user_type", response.data.data.user.user_type);
          localStorage.setItem("email", loginData.email);
          navigate("/");
        } else {
          // toast.error("Something went wrong!");
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
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
                            {error && error === "Please enter your email." && (
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
                              Login
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
  );
};
export default DealerLogIN;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import Logo from "../../assets/images/logo.png";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
// import OTPInput from "react-otp-input";
// import firebase from "./firebase.config";
// import {
//   RecaptchaVerifier,
//   getAuth,
//   signInWithPhoneNumber,
// } from "firebase/auth";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import CheckUser from "../../services/Auth";
// import axios from "axios";

// const DealerLogIN = () => {
//   const navigate = useNavigate();
//   const [phoneNumber, setPhoneNumber] = useState("");

//   const [otp, setOtp] = useState("");
//   const [show, setShow] = useState(false);

//   const [error, setError] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     onCaptchVerify();
//   }, []);

//   function onCaptchVerify() {
//     const auth = getAuth();
//     window.recaptchaVerifier = new RecaptchaVerifier(auth, "sign-in-button", {
//       size: "invisible",
//       callback: (response) => {
//         sendOtp();
//       },
//     });
//   }

//   const sendOtp = (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     const formatPh = `${phoneNumber}`;
//     const appVerifier = window.recaptchaVerifier;

//     axios
//       .post(
//         "https://harmistechnology.com/admin.indianjewelley/api/user-login",
//         {
//           phone: formatPh,
//         }
//       )
//       .then((res) => {
//         const auth = getAuth();

//         signInWithPhoneNumber(auth, formatPh, appVerifier)
//           .then((confirmationResult) => {
//             window.confirmationResult = confirmationResult;
//             setShow(true);
//             // toast.success("OTP has been sent");
//             console.log("OTP has been sent");
//           })
//           .catch((err) => {
//             console.log("SMS not sent", err);
//             // toast.error("Something went wrong");
//             setTimeout(() => {
//               window.location.reload(true);
//             }, 2000);
//           });
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleOtpVerification = (e) => {
//     e.preventDefault();

//     const code = otp;
//     console.log("OTP Code:", code);

//     window.confirmationResult
//       .confirm(code)
//       .then((result) => {
//         if (result) {
//           localStorage.setItem("isLogin", true);
//           localStorage.setItem("email", phoneNumber);

//           navigate("/");
//           // toast.success("Login Successfully...");
//         }
//       })
//       .catch((error) => {
//         console.error("Verification failed:", error);
//         // toast.error("OTP Wrong!!");
//         setOtp("");
//       });
//   };

//   return (
//     <section className="login">
//       <div className="login_main">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-md-9">
//               <div className="login_inr">
//                 <div className="row justify-content-center">
//                   <div className="col-md-8">
//                     <div className="login_info">
//                       <div className="login_info_inr">
//                         {/* <div className="login_header">
//                           <Link to="#">
//                             <img src={Logo} height="80" alt="logo" />
//                           </Link>
//                         </div> */}
//                         <div className="login_info_inr_title">
//                           <h3>Welcome</h3>
//                         </div>
//                         <div id="recaptcha-container">
//                           {show === false && (
//                             <>
//                               <form onSubmit={sendOtp}>
//                                 <div className="form-group my-3">
//                                   <PhoneInput
//                                     international
//                                     countryCallingCodeEditable={false}
//                                     defaultCountry="IN"
//                                     className="form-control phone_input"
//                                     value={phoneNumber}
//                                     onChange={setPhoneNumber}
//                                     placeholder="Enter Your Phone Number"
//                                   />
//                                 </div>
//                                 <div className="d-flex justify-content-between text-center align-items-center">
//                                   {show === true ? (
//                                     <>
//                                       <button
//                                         id="sign-in-button"
//                                         type="submit"
//                                         className="btn btn-outline-warning"
//                                         disabled
//                                       >
//                                         Send OTP
//                                       </button>
//                                     </>
//                                   ) : (
//                                     <button
//                                       id="sign-in-button"
//                                       type="submit"
//                                       className="btn btn-outline-warning"
//                                     >
//                                       Send OTP
//                                     </button>
//                                   )}
//                                   <Link
//                                     to="/login"
//                                     className="text-decoration-none"
//                                   >
//                                     User Login?
//                                   </Link>
//                                 </div>
//                               </form>
//                             </>
//                           )}

//                           {show === true && (
//                             <>
//                               <form onSubmit={handleOtpVerification}>
//                                 <div className="form-group my-3 otp_box">
//                                   <OTPInput
//                                     value={otp}
//                                     className="form-control"
//                                     onChange={setOtp}
//                                     shouldAutoFocus={true}
//                                     numInputs={6}
//                                     renderSeparator={<span>-</span>}
//                                     renderInput={(props) => (
//                                       <input {...props} />
//                                     )}
//                                   />
//                                 </div>
//                                 <div className="d-flex justify-content-between">
//                                   <button
//                                     id="sign-in-button"
//                                     type="submit"
//                                     className="btn btn-outline-warning"
//                                   >
//                                     Verfy OTP
//                                   </button>
//                                   <button
//                                     id="sign-in-button"
//                                     type="button"
//                                     onClick={sendOtp}
//                                     className="btn btn-outline-warning"
//                                   >
//                                     Resend OTP
//                                   </button>
//                                 </div>
//                               </form>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DealerLogIN;
