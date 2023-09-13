import React, { useEffect } from "react";
import profileService from "../../services/Auth";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IconName, ImCross } from "react-icons/im";

const Profile = () => {
  const email = localStorage.getItem("email");
  const [profileData, setProfileData] = useState("");
  const [files, setFiles] = useState([]);
  const onDrop = (acceptedFiles) => {
    // Create an array of file objects with a unique ID
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
    onDrop
  });

  const getProfileData = () => {
    profileService
      .profile({ email: email })
      .then((res) => {
        setProfileData(res.data);
        localStorage.setItem('user_type',res.data.user_type)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProfileData();
  }, []);

  return (
    <section className="profile">
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          {/* company_info */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-right">Company Information</h4>
          </div>
          <hr />

          <div className="col-md-4 border-right ">
            <div className="p-3 py-5">
              <div className="col-md-12">
                <label className="labels">Company Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="first name"
                  value={profileData.comapany_name}
                />
              </div>

              <div className="col-md-12 mt-3">
                <label className="labels">Company Email</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter phone number"
                  value={profileData.email}
                />
              </div>

              <div class="col-md-12 mt-3">
                <label class="labels">Company Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter your number"
                  value={profileData.phone}
                />
              </div>
            </div>
          </div>

          <div className="col-md-4 border-right ">
            <div className="p-3 py-5">
              <div class="col-md-12">
                <label class="labels">Address</label>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="enter address line 1"
                  value={profileData.address}
                />
              </div>

              <div className="col-md-12 mt-3">
                <label className="labels">Postcode</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter address line 2"
                  value={profileData.pincode}
                />
              </div>
            </div>
          </div>

          <div className="col-md-4 border-right ">
            <div className="p-3 py-5">
              <div class="col-md-12">
                <label class="labels">GST No</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter gst number"
                  value={profileData.gst_no}
                />
              </div>

              <div className="col-md-12 mt-3">
                <label className="labels">PanCard</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter pancard"
                  value=""
                />
              </div>

              <div className="col-md-12 mt-3">
                <label className="labels">Order Confirmation Contact No.</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter phonenumber"
                  value={profileData.phone}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Owner_info */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-right">Owner Information</h4>
          </div>
          <hr />

          <div className="row">
            <div className="col-md-4 border-right">
              <div className="p-3 py-5">
                <div className="col-md-12">
                  <label className="labels">Owner Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    value={profileData.name}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-4 border-right">
              <div className="p-3 py-5">
                <div className="col-md-12">
                  <label className="labels">Owner Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter phonenumber"
                    value={profileData.phone}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-4 border-right">
              <div className="p-3 py-5">
                <div className="col-md-12">
                  <label className="labels">whatsApp Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter phonenumber"
                    value={profileData.phone}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Owner_info */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-right">Logo & Documents</h4>
          </div>
          <hr />

          <div className="row">
            <div className="col-md-4 border-right">
              <div className="p-3 py-5">
                <div className="col-md-12">
                  <label className="labels"><strong>Your Logo</strong></label>
                  <input
                    type="file"
                    className="form-control"
                    placeholder="first name"
                    value=""
                  />
                  <img src={profileData.logo} className="w-100 mt-3" height={250} alt=""/>
                </div>
              </div>
            </div>

            <div className="col-md-8 border-right">
              <div className="p-3 py-5">
                <div className="col-md-12">
                  <label className="labels"><strong>Your Documents</strong></label>
                  <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    <p>Drag & drop some files here, or click to select files</p>
                  </div>
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
        </div>

        <div className="mt-5 text-center">
          <button className="btn btn-primary profile-button" type="button" disabled>
            Save Profile
          </button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
