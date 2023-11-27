import React, { useState, useEffect } from "react";
import { Modal, Button, Image } from "react-bootstrap";

const Popup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowPopup(true);
    }, 6000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <Modal
        show={showPopup}
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        className="modal fade"
      >
        <Modal.Body>
          <img
            src="https://www.smartrmail.com/blog/wp-content/uploads/2021/04/7-exit-intent-popup.png "
            alt=""
            className="w-100"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary">Login</Button>
          <Button variant="primary">Login</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Popup;
