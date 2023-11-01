import React, { useEffect } from "react";
import profileService from "../../services/Auth";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IconName, ImCross } from "react-icons/im";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const phone = localStorage.getItem("phone");
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [profileImg, setProfileImg] = useState({ preview: "", raw: "" });
  const [profileData, setProfileData] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    state: "",
    city: "",
    pancard: "",
    gst: "",
  });
  const [error, setError] = useState({
    nameErr: "",
    emailErr: "",
    phoneErr: "",
    addressErr: "",
    pincodeErr: "",
    stateErr: "",
    cityErr: "",
    pancardErr: "",
    gstErr: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setShow(false);
    setShowEdit(false);
  };

  const getProfile = async () => {
    await profileService
      .getProfile({ phone: phone })
      .then((res) => {
        console.log(res.data);
        setProfileData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditChange = (e) => {
    console.log(e.target.value);
    setUserData({ ...userData, [e.target.name]: e.target.value });
    // if (e.target.files?.length) {
    //   setProfileImg({
    //     preview: URL.createObjectURL(e.target.files[0]),
    //     raw: e.target.files[0]
    //   });
    // }
  };

  const handleEdit = async (data) => {
    setShowEdit(true);
    setSelectedData(data);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (
      !userData.name ||
      !userData.email ||
      !userData.phone ||
      !userData.address ||
      !userData.gst ||
      !userData.pincode ||
      !userData.pancard ||
      !userData.state ||
      !userData.city
    ) {
      setError({
        nameErr: "please enter your name",
        emailErr: "please enter your email",
        phoneErr: "please enter your phone",
        addressErr: "please enter your address",
        gstErr: "please enter your gst number",
        pincodeErr: "please enter your pincode",
        pancardErr: "please enter your pancard number",
        stateErr: "please enter your state",
        cityErr: "please enter your city",
      });
    } else {
      setError({
        nameErr: "",
        emailErr: "",
        phoneErr: "",
        addressErr: "",
        gstErr: "",
        pincodeErr: "",
        pancardErr: "",
        stateErr: "",
        cityErr: "",
      });
      const formData = new FormData();

      formData.append("id", selectedData.id);
      formData.append(
        "name",
        userData.name ? userData.name : selectedData.name
      );
      formData.append(
        "email",
        userData.email ? userData.email : selectedData.email
      );
      formData.append(
        "phone",
        userData.phone ? userData.phone : selectedData.phone
      );
      formData.append(
        "address",
        userData.address ? userData.address : selectedData.address
      );
      formData.append(
        "pincode",
        userData.pincode ? userData.pincode : selectedData.pincode
      );
      formData.append(
        "pancard",
        userData.pincode ? userData.pancard : selectedData.pancard
      );
      formData.append(
        "gst",
        userData.pincode ? userData.gst : selectedData.gst
      );
      formData.append(
        "state",
        userData.pincode ? userData.state : selectedData.state
      );
      formData.append(
        "city",
        userData.pincode ? userData.city : selectedData.city
      );
      profileService
        .updateProfile(formData)
        .then((res) => {
          console.log(res.status);
          if (res.status === true) {
            setShowEdit(false);
            getProfile();
            // toast.success("Profile Updated Successfully...");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <section className="profile">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Profile</h4>
            </div>
            <hr />
            <div className="row justify-content-center">
              <div className="col-md-3">
                <input
                  type="file"
                  id="upload-button"
                  style={{ display: "none" }}
                  onChange={handleEditChange}
                />
              </div>
              <div className="col-md-9">
                <div className="profile_card">
                  <div className="row justify-content-center">
                    <div className="col-md-9">
                      <div className="profile_card_inr">
                        <table className="table">
                          <tr>
                            <td>Full Name</td>
                            <td>{profileData.name}</td>
                          </tr>
                          <tr>
                            <td>Mobile Number</td>
                            <td>{profileData.phone}</td>
                          </tr>
                          <tr>
                            <td>Email Id</td>
                            <td>{profileData.email}</td>
                          </tr>
                          <tr>
                            <td>Address</td>
                            <td>{profileData.address}</td>
                          </tr>
                          <tr>
                            <td>Pincode</td>
                            <td>{profileData.pincode}</td>
                          </tr>
                          <tr>
                            <td>State</td>
                            <td>{profileData.state}</td>
                          </tr>
                          <tr>
                            <td>City</td>
                            <td>{profileData.city}</td>
                          </tr>
                          <tr>
                            <td>GST Number</td>
                            <td>{profileData.gst}</td>
                          </tr>
                          <tr>
                            <td>Pan number</td>
                            <td>{profileData.pancard}</td>
                          </tr>
                          <tr>
                            <td colSpan={2}>
                              <button
                                className="w-100 profile_edit_btn border-0"
                                onClick={() => handleEdit(profileData)}
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        className="form_intent profile_model"
        centered
        show={showEdit}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={(e) => handleUpdate(e, selectedData)}>
            <div className="row">
              <div className="col-md-6">
                <Form.Group as={Col} className="mb-2" controlId="formGridState">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    defaultValue={selectedData.name}
                    onChange={(e) => handleEditChange(e)}
                    placeholder="Enter Your Name"
                  />
                  {userData.name.length === 0 && userData.name ? (
                    ""
                  ) : (
                    <span>{error.nameErr}</span>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group as={Col} className="mb-2" controlId="formGridState">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    name="email"
                    defaultValue={selectedData.email}
                    onChange={(e) => handleEditChange(e)}
                    placeholder="Enter Your Email"
                  />
                  {userData.email.length === 0 ? (
                    ""
                  ) : (
                    <span>{error.emailErr}</span>
                  )}
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group as={Col} className="mb-2" controlId="formGridState">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    name="phone"
                    defaultValue={selectedData.phone}
                    disabled
                    onChange={(e) => handleEditChange(e)}
                    placeholder="Enter Your Phone"
                  />
                </Form.Group>
              </div>

              <div className="col-md-6">
                <Form.Group className="mb-2" controlId="formGridAddress1">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    name="pincode"
                    defaultValue={selectedData.pincode}
                    onChange={(e) => handleEditChange(e)}
                    placeholder="Enter Your Pincode"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2" controlId="formGridAddress1">
                  <Form.Label>Pan-card</Form.Label>
                  <Form.Control
                    name="pancard"
                    defaultValue={selectedData.pancard}
                    onChange={(e) => handleEditChange(e)}
                    placeholder="Enter Your Pancard number"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2" controlId="formGridAddress1">
                  <Form.Label>GST-number</Form.Label>
                  <Form.Control
                    name="gst"
                    defaultValue={selectedData.gst}
                    onChange={(e) => handleEditChange(e)}
                    placeholder="Enter Your GST number"
                  />
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group as={Col} className="mb-2" controlId="formGridZip">
                  <Form.Label>Address</Form.Label>

                  <textarea
                    name="address"
                    className="form-control"
                    defaultValue={selectedData.address}
                    onChange={(e) => handleEditChange(e)}
                    placeholder="Enter Your Address"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2" controlId="formGridAddress1">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    name="state"
                    defaultValue={selectedData.state}
                    onChange={(e) => handleEditChange(e)}
                    placeholder="Enter Your State"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2" controlId="formGridAddress1">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    name="city"
                    defaultValue={selectedData.city}
                    onChange={(e) => handleEditChange(e)}
                    placeholder="Enter Your City"
                  />
                </Form.Group>
              </div>
            </div>

            <div className="text-center">
              <Button variant="primary" type="submit">
                Update
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default Profile;
