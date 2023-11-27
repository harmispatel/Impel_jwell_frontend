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
  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState();
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    onCaptchVerify();
  }, []);

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
            return;
          } else {
            const auth = getAuth();
            signInWithPhoneNumber(auth, formatPh, appVerifier)
              .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                toast.success("OTP sent successfully!");
                localStorage.setItem("user_type", res.data.user_type);
                localStorage.setItem("user_id", res.data.user_id);
                localStorage.setItem("verification", res.data.verification);
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

          navigate("/");
          toast.success("Login Successfully...");
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
                          <h3>Welcome</h3>
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
                                      class="button-60"
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
                                  <button
                                    id="sign-in-button"
                                    type="button"
                                    onClick={sendOtp}
                                    className="btn btn-outline-warning"
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
// import React from "react";
// import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
// import { CgSpinner } from "react-icons/cg";
// import firebase from "./firebase.config";
// import { useState } from "react";
// import { auth } from "./firebase.config";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
// import { toast, Toaster } from "react-hot-toast";
// import OTPInput from "react-otp-input";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";

// const Login = () => {
//   const [otp, setOtp] = useState("");
//   const [ph, setPh] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showOTP, setShowOTP] = useState(false);
//   const [user, setUser] = useState(null);

//   function onCaptchVerify() {
//     if (!window.recaptchaVerifier) {
//       window.recaptchaVerifier = new RecaptchaVerifier(
//         "recaptcha-container",
//         {
//           size: "invisible",
//           callback: (response) => {
//             onSignup();
//           },
//           "expired-callback": () => {},
//         },
//         auth
//       );
//     }
//   }

//   function onSignup() {
//     setLoading(true);
//     onCaptchVerify();

//     const appVerifier = window.recaptchaVerifier;

//     const formatPh = "+" + ph;

//     signInWithPhoneNumber(auth, formatPh, appVerifier)
//       .then((confirmationResult) => {
//         window.confirmationResult = confirmationResult;
//         setLoading(false);
//         setShowOTP(true);
//         toast.success("OTP sended successfully!");
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }

//   function onOTPVerify() {
//     setLoading(true);
//     window.confirmationResult
//       .confirm(otp)
//       .then(async (res) => {
//         console.log(res);
//         setUser(res.user);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false);
//       });
//   }
//   return (
//     <>
//       <section className="login">
//         <section className="bg-emerald-500 flex items-center justify-center h-screen">
//           <div>
//             <Toaster toastOptions={{ duration: 4000 }} />
//             <div id="recaptcha-container"></div>
//             {user ? (
//               <h2 className="text-center text-white font-medium text-2xl">
//                 👍Login Success
//               </h2>
//             ) : (
//               <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
//                 <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
//                   Welcome to <br /> CODE A PROGRAM
//                 </h1>
//                 {showOTP ? (
//                   <>
//                     <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
//                       <BsFillShieldLockFill size={30} />
//                     </div>
//                     <label
//                       htmlFor="otp"
//                       className="font-bold text-xl text-white text-center"
//                     >
//                       Enter your OTP
//                     </label>
//                     <OTPInput
//                       value={otp}
//                       onChange={setOtp}
//                       OTPLength={6}
//                       otpType="number"
//                       disabled={false}
//                       autoFocus
//                       className="opt-container "
//                     ></OTPInput>
//                     <button
//                       onClick={onOTPVerify}
//                       className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//                     >
//                       {loading && (
//                         <CgSpinner size={20} className="mt-1 animate-spin" />
//                       )}
//                       <span>Verify OTP</span>
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
//                       <BsTelephoneFill size={30} />
//                     </div>
//                     <label
//                       htmlFor=""
//                       className="font-bold text-xl text-white text-center"
//                     >
//                       Verify your phone number
//                     </label>
//                     <PhoneInput country={"in"} value={ph} onChange={setPh} />
//                     <button
//                       onClick={onSignup}
//                       className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
//                     >
//                       {loading && (
//                         <CgSpinner size={20} className="mt-1 animate-spin" />
//                       )}
//                       <span>Send code via SMS</span>
//                     </button>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         </section>
//       </section>
//     </>
//   );
// };

// export default Login;
