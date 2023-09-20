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
  const [selectedData,setSelectedData] = useState([])
  const [profileImg, setProfileImg] = useState({ preview: "", raw: "" });
  const [profileData,setProfileData] = useState([])
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const handleClose = () => {
    setShow(false);
    setShowEdit(false);
  };

  const getProfile = async () =>{
   await profileService.getProfile({phone:phone}).then(res=>{
    console.log(res.data);
      setProfileData(res.data)
    }).catch(err=>{
      console.log(err);
    })
  }

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
    setSelectedData(data)
  };

  const handleUpdate = async (e) =>{
    e.preventDefault()

    const formData = new FormData();
    
    formData.append("id",selectedData.id)
    formData.append("name",userData.name ? userData.name : selectedData.name)
    formData.append("email",userData.email ? userData.email : selectedData.email)
    formData.append("phone",userData.phone? userData.phone : selectedData.phone)
    formData.append("address",userData.address ? userData.address : selectedData.address)
    formData.append("pincode",userData.pincode ? userData.pincode : selectedData.pincode)

    profileService.updateProfile(formData).then(res=>{
      console.log(res.status);
      if (res.status === true) {
        setShowEdit(false);
        getProfile()
        toast.success("Profile Updated Successfully...");
      }
    }).catch(err=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    getProfile()
  },[])


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
                            <td colSpan={2}>
                              <button
                                className="w-100 profile_edit_btn border-0"
                                onClick={()=>handleEdit(profileData)}
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
        className="form_intent"
        centered
        show={showEdit}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Profile</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={(e)=>handleUpdate(e,selectedData)}>
            <Form.Group as={Col} className="mb-2" controlId="formGridState">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                defaultValue={selectedData.name}
                onChange={(e) => handleEditChange(e)}
                placeholder="Enter Your Name"
              />
            </Form.Group>

            <Form.Group as={Col} className="mb-2" controlId="formGridState">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                defaultValue={selectedData.email}
                onChange={(e) => handleEditChange(e)}
                placeholder="Enter Your Email"
              />
            </Form.Group>

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

            <Form.Group as={Col} className="mb-2" controlId="formGridZip">
              <Form.Label>Address</Form.Label>
              <Form.Control
                name="address"
                defaultValue={selectedData.address}
                onChange={(e) => handleEditChange(e)}
                placeholder="Enter Your Address"
              />
            </Form.Group>
            <Form.Group className="mb-2" controlId="formGridAddress1">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                name="pincode"
                defaultValue={selectedData.pincode}
                onChange={(e) => handleEditChange(e)}
                placeholder="Enter Your Pincode"
              />
            </Form.Group>

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
