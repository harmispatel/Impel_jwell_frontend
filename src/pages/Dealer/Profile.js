import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImCross } from "react-icons/im";
import toast from "react-hot-toast";
import profileService from "../../services/Auth";
import { Helmet } from "react-helmet-async";

const DealerProfile = () => {
  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");
  const [profileData, setProfileData] = useState("");

  // const [dealerProfile,setDealerProfile] = useState(
  //   companyname='',
  //   address='',
  //   gstno='',
  //   companyemail='',
  //   postcode='',
  //   pancard='',
  //   companynumber='',
  //   orderconfirmationcontact='',
  //   ownername=''
  // )

  const [files, setFiles] = useState([]);
  const onDrop = (acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      id: Math.random().toString(36).substring(7),
    }));

    setFiles([...files, ...newFiles]);
  };

  const removeFile = (id) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  });

  const handleImageChange = (e) => {
    const fileInput = document.getElementById("upload");
    const file = e.target.files[0];
    const maxSize = 5 * 1024 * 1024;

    if (file?.size > maxSize) {
      toast.error("File size exceeds the 5 MB limit");
      fileInput.value = "";
      return;
    }

    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"];
    if (!allowedTypes?.includes(file?.type)) {
      toast.error(
        "Invalid file type. Please upload a PNG, JPEG, JPG, or GIF file."
      );
      fileInput.value = "";
      return;
    }

    const reader = new FileReader();
    const myFormData = new FormData(
      document.getElementById("user-profile-form")
    );

    reader.onloadend = () => {
      profileService
        .UserProfileImage(myFormData)
        .then((res) => {
          if (res.status === true) {
            getDealerProfileData();
            window.location.reload(false);
            toast.success(res.message);
          } else {
            getDealerProfileData();
            toast.error(res.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const getDealerProfileData = () => {
    profileService
      .profile({ email: email, token: token })
      .then((res) => {
        setProfileData(res.data);
        localStorage.setItem("user_type", res.data.user_type);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDealerProfileData();
  }, []);

  return (
    <>
      <Helmet>
        <title>Impel Store - Dealer Profile</title>
      </Helmet>
      <section className="profile">
        <div className="container rounded bg-white mb-5 p-5">
          <div className="row mb-4">
            {/* Owner_info */}
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="text-right">Owner Information</h4>
            </div>
            <div className="row">
              <div className="col-md-4">
                <label className="labels">Owner Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileData.name}
                  disabled
                />
              </div>
              <div className="col-md-4">
                <label className="labels">Owner Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileData.email}
                  disabled
                />
              </div>
              <div className="col-md-4">
                <label className="labels">Owner Phone No.</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileData.phone}
                  disabled
                />
              </div>
              <div className="col-md-4 mt-3">
                <label className="labels">Owner Whatsapp No.</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileData.phone}
                  disabled
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="row mb-4">
            {/* company_info */}
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="text-right">Company Information</h4>
            </div>
            <div className="row">
              <div className="col-md-4">
                <label className="labels">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileData.comapany_name}
                  disabled
                />
              </div>
              <div class="col-md-4">
                <label class="labels">GST No</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileData.gst_no}
                  disabled
                />
              </div>
              <div class="col-md-4">
                <label class="labels">Address</label>
                <textarea
                  type="text"
                  rows={2}
                  className="form-control"
                  value={profileData.address}
                  disabled
                />
              </div>
              <div className="col-md-4 mt-2">
                <label className="labels">Pincode</label>
                <input
                  type="number"
                  className="form-control"
                  value={profileData.pincode}
                  disabled
                />
              </div>
              <div className="col-md-4 mt-2">
                <label className="labels">State</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileData?.state?.name}
                  disabled
                />
              </div>
              <div className="col-md-4 mt-2">
                <label className="labels">City</label>
                <input
                  type="text"
                  className="form-control"
                  value={profileData?.city?.name}
                  disabled
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="row mb-4">
            {/* Owner_info */}
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="text-right">Logo & Documents</h4>
            </div>
            <div className="row">
              <div className="col-md-4">
                <label className="labels">
                  <strong>Profile picture</strong>
                </label>
                <br />
                {profileData?.profile && (
                  <>
                    <div className="imagesss">
                      <div className="profile-image">
                        <form
                          id="user-profile-form"
                          method="POST"
                          encType="multipart/form-data"
                        >
                          <input
                            type="hidden"
                            name="user_id"
                            value={profileData?.id}
                          />
                          <input
                            id="upload"
                            name="user_image"
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{ display: "none" }}
                          />

                          <label
                            className="new-button"
                            htmlFor="upload"
                            style={{
                              cursor: "pointer",
                              display: "inline-block",
                              border: "1px solid #ccc",
                              borderRadius: "5px",
                            }}
                          >
                            <img
                              src={profileData?.profile}
                              alt="Uploaded"
                              className="uploaded-image"
                            />
                          </label>
                        </form>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="col-md-4">
                <label className="labels">
                  <strong>Company Logo</strong>
                </label>

                <br />
                <img
                  src={profileData?.company_logo}
                  className="mt-3"
                  width={200}
                  alt=""
                />
              </div>
              <div className="col-md-4">
                <label className="labels">
                  <strong>Your Documents</strong>
                </label>
                {/* <div {...getRootProps()} className="dropzone" disabled>
                    <input {...getInputProps()} />
                    <p>Drag & drop some files here, or click to select files</p>
                  </div> */}
                <div className="file-preview">
                  <div className="row">
                    {files.map((file) => (
                      <div className="col-md-3">
                        <div
                          key={file.id}
                          className="file-item position-relative"
                        >
                          <img
                            src={URL.createObjectURL(file.file)}
                            alt={file.file.name}
                            className="file-thumbnail w-100"
                          />
                          <span
                            className="close-icon"
                            onClick={() => removeFile(file.id)}
                          >
                            <ImCross />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DealerProfile;
