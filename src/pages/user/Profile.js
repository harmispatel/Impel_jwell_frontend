import React, { useEffect } from "react";
import profileService from "../../services/Auth";
import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import toast from "react-hot-toast";

const Profile = () => {
  const phone = localStorage.getItem("phone");
  const [showEdit, setShowEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedData, setSelectedData] = useState([]);
  const [profileImg, setProfileImg] = useState({ preview: "", raw: "" });
  const [profileData, setProfileData] = useState([]);
  const [city, setcity] = useState();
  const [shipping_city, setShipping_city] = useState();

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
    shipping_address: "",
    shipping_pincode: "",
    shipping_state: "",
    shipping_city: "",
    gst_no: "",
    pan_no: "",
    state: "",
    city: "",
    states: "",
    address_same_as_company: "",
  });
  const [isChecked, setIsChecked] = useState(userData.address_same_as_company);
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
    shipping_address_err: "",
    shipping_pincode_err: "",
    shipping_state_err: "",
    shipping_city_err: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => {
    setShow(false);
    setShowEdit(false);
  };

  const handleCheckboxChange = (event) => {
    const newValue = event.target.checked ? 1 : 0;
    setIsChecked(newValue);
  };

  // user profile display function
  const getProfile = async () => {
    await profileService
      .getProfile({ phone: phone })
      .then((res) => {
        const statename = res.data.state.name;
        const cityname = res.data.city.name;
        setProfileData({
          ...res.data,
          state_name: statename,
          city_name: cityname,
          state: res.data.state.id,
          city: res.data.city.id,
          shipping_state: res.data.shipping_state.id,
          shipping_city: res.data.shipping_city.id,
        });
        setUserData({
          ...res.data,
          state_name: statename,
          city_name: cityname,
          state: res.data.state.id,
          city: res.data.city.id,
          shipping_state: res.data.shipping_state.id,
          shipping_city: res.data.shipping_city.id,
        });
        res.data.state.id && fetchCity(res.data.state.id);
        res.data.shipping_state.id &&
          fetchShippingCity(res.data.shipping_state.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchCity = async (stateId) => {
    await profileService
      .getCity({ state_id: stateId })
      .then((res) => {
        setcity(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchShippingCity = async (cityId) => {
    await profileService
      .getCity({ state_id: cityId })
      .then((res) => {
        setShipping_city(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") {
      setUserData({
        ...userData,
        state: value,
        city: "",
      });
    } else if (name === "shipping_state") {
      setUserData({
        ...userData,
        shipping_state: value,
        shipping_city: "",
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
  const pincodeRegex = /^\d{6}$/;
  const handleEdit = async (data) => {
    setShowEdit(true);
    setSelectedData(data);
  };
  const validateForm = () => {
    let isValid = true;
    const validationErrors = { ...error };
    if (!userData.name.trim()) {
      validationErrors.nameErr = "Name is required";
      isValid = false;
    } else {
      validationErrors.nameErr = "";
    }

    if (!userData.email.trim()) {
      validationErrors.emailErr = "Email is required";
      isValid = false;
    } else if (
      !/^[a-zA-Z\d\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/i.test(userData.email)
    ) {
      validationErrors.emailErr = "Invalid email address";
      isValid = false;
    } else if (userData.email.indexOf("@") === -1) {
      validationErrors.emailErr = "Email address must contain @ symbol";
      isValid = false;
    } else {
      validationErrors.emailErr = "";
    }

    if (!userData.address.trim()) {
      validationErrors.addressErr = "Address is required";
      isValid = false;
    } else {
      validationErrors.addressErr = "";
    }
    if (!userData.pincode.trim()) {
      validationErrors.pincodeErr = "Pincode is required";
      isValid = false;
    } else if (!pincodeRegex.test(userData.pincode.trim())) {
      validationErrors.pincodeErr = "Pincode must be a 6-digit number";
      isValid = false;
    } else {
      validationErrors.pincodeErr = "";
    }

    if (userData.state == "" || userData.state == undefined) {
      validationErrors.stateErr = "State must be select";
      isValid = false;
    } else {
      validationErrors.stateErr = "";
    }
    if (userData.city == "" || userData.city == undefined) {
      validationErrors.cityErr = "City must be select";
      isValid = false;
    } else {
      validationErrors.cityErr = "";
    }

    if (!isChecked) {
      if (!userData.shipping_address.trim()) {
        validationErrors.shipping_address_err = "Address is required";
        isValid = false;
      } else {
        validationErrors.shipping_address_err = "";
      }

      if (!userData.shipping_pincode.trim()) {
        validationErrors.shipping_pincode_err = "Pincode is required";
        isValid = false;
      } else if (!pincodeRegex.test(userData.shipping_pincode.trim())) {
        validationErrors.shipping_pincode_err =
          "Pincode must be a 6-digit number";
        isValid = false;
      } else {
        validationErrors.shipping_pincode_err = "";
      }

      if (
        userData.shipping_state == "" ||
        userData.shipping_state == undefined
      ) {
        validationErrors.shipping_state_err = "shipping state must be select";
        isValid = false;
      } else {
        validationErrors.shipping_state_err = "";
      }
      if (userData.shipping_city == "" || userData.shipping_city == undefined) {
        validationErrors.shipping_city_err = "shipping city must be select";
        isValid = false;
      } else {
        validationErrors.shipping_city_err = "";
      }
    } else {
      validationErrors.shipping_address_err = "";
      validationErrors.shipping_pincode_err = "";
      validationErrors.shipping_state_err = "";
      validationErrors.shipping_city_err = "";
    }
    setError(validationErrors);
    return isValid;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const isFormValid = validateForm();
    localStorage.setItem("verification", profileData.verification);
    if (isFormValid) {
      const formData = new FormData();
      formData.append("id", selectedData.id);
      formData.append("name", userData.name ? userData.name : "");
      formData.append("email", userData.email ? userData.email : "");
      formData.append("phone", userData.phone ? userData.phone : "");
      formData.append("pan_no", userData.pan_no ? userData.pan_no : "");
      formData.append("gst_no", userData.gst_no ? userData.gst_no : "");

      // company address update
      formData.append("address", userData.address ? userData.address : "");
      formData.append("pincode", userData.pincode ? userData.pincode : "");
      formData.append("state", userData.state ? userData.state : "");
      formData.append("city", userData.city ? userData.city : "");

      // checkbox update
      if (isChecked) {
        formData.append("address_same_as_company", 1);
      } else {
        formData.append("address_same_as_company", 0);
      }

      // shipping address update
      formData.append(
        "shipping_address",
        userData.shipping_address ? userData.shipping_address : ""
      );
      formData.append(
        "shipping_pincode",
        userData.shipping_pincode ? userData.shipping_pincode : ""
      );
      formData.append(
        "shipping_state",
        userData.shipping_state ? userData.shipping_state : ""
      );
      formData.append(
        "shipping_city",
        userData.shipping_city ? userData.shipping_city : ""
      );

      profileService
        .updateProfile(formData)
        .then((res) => {
          if (res.status === true) {
            setShowEdit(false);
            getProfile();
            toast.success(res.message);
            localStorage.setItem("verification", res.data.verification);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(err.message);
        });
    } else {
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
                          <tbody>
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
                              <td>Company Address</td>
                              <td>{profileData.address}</td>
                            </tr>
                            <tr>
                              <td>Pincode</td>
                              <td>{profileData.pincode}</td>
                            </tr>
                            <tr>
                              <td>State</td>
                              <td>{profileData?.state_name}</td>
                            </tr>
                            <tr>
                              <td>City</td>
                              <td>{profileData?.city_name}</td>
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
                          </tbody>
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
          <Form
            onSubmit={(e) => handleUpdate(e, selectedData)}
            onKeyUp={(e) => validateForm(e)}
          >
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
                  <span className="text-danger">{error.nameErr}</span>
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
                  <span className="text-danger">{error.emailErr}</span>
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
                  <span className="text-danger">{error.phoneErr}</span>
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
                  <span className="text-danger">{error.pancardErr}</span>
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Group className="mb-2" controlId="formGridAddress1">
                  <Form.Label>GST-number</Form.Label>
                  <Form.Control
                    name="gst_no"
                    defaultValue={selectedData.gst_no}
                    onChange={(e) => handleEditChange(e)}
                    placeholder="Enter Your GST number"
                  />
                  <span className="text-danger">{error.gstErr}</span>
                </Form.Group>
              </div>
              <hr />
              <div className="col-md-6">
                <Form.Group as={Col} className="mb-2" controlId="formGridZip">
                  <Form.Label>Company Address</Form.Label>
                  <textarea
                    name="address"
                    className="form-control"
                    defaultValue={selectedData.address}
                    onChange={(e) => {
                      handleEditChange(e);
                    }}
                    placeholder="Enter Your Address"
                  />
                  <span className="text-danger">{error.addressErr}</span>
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
                    maxLength={6}
                  />
                  <span className="text-danger">{error.pincodeErr}</span>
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
                      fetchCity(e.target.value);
                    }}
                    value={userData.state}
                  >
                    <option value="">--state select--</option>
                    {profileData?.states?.map((userstate, index) => (
                      <option key={index} value={userstate.id}>
                        {userstate.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-danger">{error.stateErr}</span>
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Group className="mb-2" controlId="formGridAddress1">
                  <Form.Label>City</Form.Label>
                  <select
                    className="form-control"
                    name="city"
                    onChange={(e) => {
                      handleEditChange(e);
                    }}
                    value={userData.city}
                  >
                    <option value="">--city select--</option>
                    {city?.map((usercity, index) => (
                      <option key={index} value={usercity.id}>
                        {usercity.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-danger">{error.cityErr}</span>
                </Form.Group>
              </div>
              <div className="address-checkbox-btn">
                <input
                  type="checkbox"
                  id="checkbox"
                  name="address_same_as_company"
                  className="address-checkbox"
                  checked={isChecked === 1}
                  defaultChecked={profileData.address_same_as_company}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="checkbox" className="ms-1 address-check-text">
                  Shipping Address is as same above then check this box
                </label>
              </div>
              <hr className="mt-3" />
              <div className="col-md-6">
                <Form.Group as={Col} className="mb-2" controlId="formGridZip">
                  <Form.Label>Shipping Address</Form.Label>
                  <textarea
                    name="shipping_address"
                    className="form-control"
                    defaultValue={selectedData.shipping_address}
                    onChange={(e) => {
                      handleEditChange(e);
                    }}
                    placeholder="Enter Your Address"
                  />
                  <span className="text-danger">
                    {error.shipping_address_err}
                  </span>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2" controlId="formGridAddress1">
                  <Form.Label>Shipping Pincode</Form.Label>
                  <Form.Control
                    name="shipping_pincode"
                    defaultValue={selectedData.shipping_pincode}
                    onChange={(e) => handleEditChange(e)}
                    placeholder="Enter Your Pincode"
                    maxLength={6}
                  />
                  <span className="text-danger">
                    {error.shipping_pincode_err}
                  </span>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-2" controlId="formGridAddress1">
                  <Form.Label>Shipping-State</Form.Label>
                  <select
                    className="form-control"
                    name="shipping_state"
                    onChange={(e) => {
                      handleEditChange(e);
                      fetchShippingCity(e.target.value);
                    }}
                    value={userData.shipping_state}
                  >
                    <option value="">--shipping state select--</option>
                    {profileData?.states?.map((userstate, index) => (
                      <option key={index} value={userstate.id}>
                        {userstate.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-danger">
                    {error.shipping_state_err}
                  </span>
                </Form.Group>
              </div>
              <div className="col-md-6 mb-3">
                <Form.Group className="mb-2" controlId="formGridAddress1">
                  <Form.Label>Shipping-City</Form.Label>
                  <select
                    className="form-control"
                    name="shipping_city"
                    onChange={(e) => {
                      handleEditChange(e);
                    }}
                    value={userData.shipping_city}
                  >
                    <option value="">--shipping City select--</option>
                    {shipping_city?.map((usercity, index) => (
                      <option key={index} value={usercity.id}>
                        {usercity.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-danger">{error.shipping_city_err}</span>
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
