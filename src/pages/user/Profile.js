import React, { useEffect } from "react";
import profileService from "../../services/Auth";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { IconName, ImCross } from "react-icons/im";

const Profile = () => {
  const email = localStorage.getItem("email");

  return (
    <section className="profile">
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-right">Account</h4>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-3">
            <div>OverView</div>
            <hr />

            <div>Orders & Returns</div>
            <hr />
          </div>
          <div className="col-md-9">
            <div>
              <h4>Profile Details</h4>
            </div>
            <hr />
            <form></form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
