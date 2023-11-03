import React, { useEffect } from "react";
import profileService from "../../services/Auth";
import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Profile = () => {
  const phone = localStorage.getItem("phone");
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [profileImg, setProfileImg] = useState({ preview: "", raw: "" });
  const [profileData, setProfileData] = useState([]);
  const [city, setcity] = useState([]);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    gst_no: "",
    pan_no: "",
    state: "",
    city: "",
    states: "",
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

  // user profile display function
  const getProfile = async () => {
    await profileService
      .getProfile({ phone: phone })
      .then((res) => {
        console.log("userData", res.data);
        setProfileData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target.value);
    if (name === "states") {
      setUserData({
        ...userData,
        states: value,
      });
    } else {
      setUserData({
        ...userData,
        [name]: value,
      });
    }
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

    const formData = new FormData();
    console.log("Users Updated Form data", formData);
    localStorage.setItem("verification", profileData.verification);

    formData.append("id", selectedData.id);
    formData.append("name", userData.name ? userData.name : selectedData.name);
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
      "gst_no",
      userData.gst_no ? userData.gst_no : selectedData.gst_no
    );
    formData.append(
      "pan_no",
      userData.pan_no ? userData.pan_no : selectedData.pan_no
    );
    formData.append("city", userData.city ? userData.city : selectedData.city);
    formData.append(
      "state",
      userData.state ? userData.state : selectedData.state
    );

    profileService
      .updateProfile(formData)
      .then((res) => {
        console.log(res.status);
        if (res.status === true) {
          setShowEdit(false);
          getProfile();
          toast.success(res.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
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
                            <td>{profileData?.state}</td>
                          </tr>
                          <tr>
                            <td>City</td>
                            <td>{profileData.city}</td>
                          </tr>
                          <tr>
                            <td>GST Number</td>
                            <td>{profileData.gst_no}</td>
                          </tr>
                          <tr>
                            <td>Pan number</td>
                            <td>{profileData.pan_no}</td>
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
                    name="pan_no"
                    defaultValue={selectedData.pan_no}
                    onChange={(e) => handleEditChange(e)}
                    placeholder="Enter Your Pancard number"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2" controlId="formGridAddress1">
                  <Form.Label>GST-number</Form.Label>
                  <Form.Control
                    name="gst_no"
                    defaultValue={selectedData.gst_no}
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
                  <select
                    className="form-control"
                    name="state"
                    onChange={(e) => {
                      handleEditChange(e);
                    }}
                    value={userData.state}
                  >
                    <option>--state select--</option>
                    {profileData?.states?.map((userstate, index) => (
                      <option key={index} value={userstate.name}>
                        {userstate.name}
                      </option>
                    ))}
                  </select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2" controlId="formGridAddress1">
                  <Form.Label>City</Form.Label>
                  <select className="form-control">
                    <option>--city select--</option>
                  </select>
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
