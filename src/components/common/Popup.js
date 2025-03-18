import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Modal } from "reactstrap";
import ringJewelley from "../../assets/images/engagement-ring_7354745.png";
import leftImage from "../../pages/landing-page/assets/NewBanner/banner-3.JPEG";

const Popup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(() => {
    const storedState = localStorage.getItem("showPopup");
    return storedState ? JSON.parse(storedState) : false;
  });

  useEffect(() => {
    localStorage.setItem("showPopup", JSON.stringify(showPopup));
    localStorage.setItem("redirectPath", location.pathname);
  }, [showPopup, location.pathname]);

  useEffect(() => {
    if (window.location.reload && !showPopup) {
      const timeout = setTimeout(() => {
        setShowPopup(true);
      }, 300000);

      return () => clearTimeout(timeout);
    }
  }, [showPopup]);

  useEffect(() => {
    if (window.location.reload && showPopup) {
      setShowPopup(true);
    }
  }, []);

  const handleLogin = () => {
    navigate("/login");
    setShowPopup(false);
  };

  return (
    <>
      <Modal
        isOpen={showPopup}
        backdrop="static"
        keyboard={false}
        scrollable={true}
        centered={true}
        style={{ maxWidth: "750px", width: "80%" }}
      >
        <div className="row">
          <div className="col-md-6 p-0 d-none d-md-block">
            <div className="newsletter-popup__bg">
              <img
                src="https://uomo-nextjs-ecommerce.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fnewsletter-popup.jpg&w=640&q=75"
                alt="image"
                className="w-100 h-100"
              />
            </div>
          </div>
          <div className="col-md-6 p-4 d-flex align-items-center text-center">
            <div className="block-newsletter">
              <img src={ringJewelley} alt="image" className="w-25 mb-4" />
              <h5 className="block__title">
                Connect with Direct Manufacturer & Get Lifetime Plating on All
                Our Jewelry!
              </h5>
              <p className="my-4">
                Unlock exclusive discounts by logging in to your account. Don't
                miss out on special deals and offers!
              </p>
              <button className="model_login_button" onClick={handleLogin}>
                Login to Access Discounts
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Popup;
