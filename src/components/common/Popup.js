import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(() => {
    const storedState = localStorage.getItem("showPopup");
    return storedState ? JSON.parse(storedState) : false;
  });

  useEffect(() => {
    localStorage.setItem("showPopup", JSON.stringify(showPopup));
  }, [showPopup]);

  useEffect(() => {
    if (window.location.reload && !showPopup) {
      setShowPopup(false);
      const timeout = setTimeout(() => {
        setShowPopup(true);
      }, 600000);

      return () => clearTimeout(timeout);
    }
  }, [showPopup]);

  useEffect(() => {
    if (window.location.reload && showPopup) {
      setShowPopup(true);
    }
  }, []);

  return (
    <>
      <Modal
        show={showPopup}
        id="exampleModalCenter"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
        className="modal fade"
      >
        <Modal.Body>
          <img
            src="https://www.smartrmail.com/blog/wp-content/uploads/2021/04/7-exit-intent-popup.png"
            alt=""
            className="w-100"
          />
        </Modal.Body>
        <Modal.Footer>
          <Link to="/login" className="btn btn-primary">
            Login
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Popup;
