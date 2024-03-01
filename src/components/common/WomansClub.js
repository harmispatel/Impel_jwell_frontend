import React, { useState } from "react";
import "./WomansClub.css";
import Select from "react-select";

const WomansClub = () => {
  const [details, setDetails] = useState({
    fullName: "",
    number: "",
    email: "",
    city: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState({
    instagram: false,
    facebook: false,
    pinterest: false,
    family: false,
    exibitions: false,
    campaign: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setIsChecked({ ...isChecked, [name]: checked });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    if (!details.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      valid = false;
    }

    if (!details.number.trim()) {
      newErrors.number = "Number is required";
      valid = false;
    } else if (details.number.length !== 10 || isNaN(details.number)) {
      newErrors.number = "Your mobile number should be 10 digits";
      valid = false;
    }

    if (!details.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(details.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }

    if (!details.city.trim()) {
      newErrors.city = "City is required";
      valid = false;
    }

    if (!details.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }
    if (
      !isChecked.instagram &&
      !isChecked.facebook &&
      !isChecked.pinterest &&
      !isChecked.family &&
      !isChecked.exibitions &&
      !isChecked.campaign
    ) {
      newErrors.checkbox = "Please select at least one option";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails({ ...details, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted");
      setDetails({
        fullName: "",
        number: "",
        email: "",
        city: "",
        message: "",
      });
      setIsChecked({
        instagram: false,
        facebook: false,
        pinterest: false,
        family: false,
        exibitions: false,
        campaign: false,
      });
    }
  };

  return (
    <>
      <button
        className="womans-toggle"
        data-bs-toggle="offcanvas"
        href="#offcanvasExample"
        role="button"
        aria-controls="offcanvasExample"
      >
        Join our women's club
      </button>
      <div className="womans_club">
        <div
          class="offcanvas offcanvas-start"
          tabindex="-1"
          id="offcanvasExample"
          aria-labelledby="offcanvasExampleLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">
              Contact information
            </h5>
            <button
              type="button"
              class="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <div className="text-center">
              PLEASE PROVIDE INFORMATION AND WE WILL GET BACK TO YOU SOON
            </div>
            <div class="mt-3">
              <section id="contact-us" className="contact-us">
                <div className="">
                  <div className="contact-main">
                    <div className="contact_box">
                      <div className="contact_form">
                        <form onSubmit={handleSubmit}>
                          <div className="row">
                            <div className="col-md-4">
                              <div className="form-group position-relative">
                                <label>Full Name</label>
                                <input
                                  type="text"
                                  name="fullName"
                                  className={
                                    errors.fullName
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  placeholder="Enter full name"
                                  value={details.fullName}
                                  onChange={handleChange}
                                />
                                {errors.fullName && (
                                  <div className="invalid-feedback">
                                    {errors.fullName}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group position-relative">
                                <label>Mobile Number (whatsapp)</label>
                                <input
                                  type="tel"
                                  name="number"
                                  className={
                                    errors.number
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  placeholder="Enter phone number"
                                  value={details.number}
                                  onChange={handleChange}
                                  maxlength="10"
                                  minlength="10"
                                />
                                {errors.number && (
                                  <div className="invalid-feedback">
                                    {errors.number}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-md-4">
                              <div className="form-group position-relative">
                                <label>Email</label>
                                <input
                                  type="text"
                                  name="email"
                                  className={
                                    errors.email
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  placeholder="Enter valid email"
                                  value={details.email}
                                  onChange={handleChange}
                                />
                                {errors.email && (
                                  <div className="invalid-feedback">
                                    {errors.email}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-group position-relative">
                                <label>City Name</label>
                                <input
                                  type="text"
                                  name="city"
                                  className={
                                    errors.city
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  placeholder="Enter city"
                                  value={details.city}
                                  onChange={handleChange}
                                />
                                {errors.city && (
                                  <div className="invalid-feedback">
                                    {errors.city}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group position-relative">
                                <label>How You Know About Us ?</label>
                                <div className="row">
                                  <div className="col-md-5 col-5">
                                    <div class="checkbox-wrapper-42">
                                      <input
                                        id="instagram"
                                        name="instagram"
                                        type="checkbox"
                                        checked={isChecked.instagram}
                                        onChange={handleCheckboxChange}
                                      />
                                      <label
                                        class="cbx"
                                        for="instagram"
                                      ></label>
                                      <label class="lbl" for="instagram">
                                        Instagram
                                      </label>
                                    </div>

                                    <div class="checkbox-wrapper-42">
                                      <input
                                        id="facebook"
                                        name="facebook"
                                        type="checkbox"
                                        checked={isChecked.facebook}
                                        onChange={handleCheckboxChange}
                                      />
                                      <label class="cbx" for="facebook"></label>
                                      <label class="lbl" for="facebook">
                                        Facebook
                                      </label>
                                    </div>
                                    <div class="checkbox-wrapper-42">
                                      <input
                                        id="pinterest"
                                        name="pinterest"
                                        type="checkbox"
                                        checked={isChecked.pinterest}
                                        onChange={handleCheckboxChange}
                                      />
                                      <label
                                        class="cbx"
                                        for="pinterest"
                                      ></label>
                                      <label class="lbl" for="pinterest">
                                        Pinterest
                                      </label>
                                    </div>
                                  </div>
                                  <div className="col-md-7 col-7">
                                    <div class="checkbox-wrapper-42">
                                      <input
                                        id="family"
                                        name="family"
                                        type="checkbox"
                                        checked={isChecked.family}
                                        onChange={handleCheckboxChange}
                                      />
                                      <label class="cbx" for="family"></label>
                                      <label class="lbl" for="family">
                                        Friend or family
                                      </label>
                                    </div>
                                    <div class="checkbox-wrapper-42">
                                      <input
                                        id="exibitions"
                                        name="exibitions"
                                        type="checkbox"
                                        checked={isChecked.exibitions}
                                        onChange={handleCheckboxChange}
                                      />
                                      <label
                                        class="cbx"
                                        for="exibitions"
                                      ></label>
                                      <label class="lbl" for="exibitions">
                                        Our Exibitions
                                      </label>
                                    </div>
                                    <div class="checkbox-wrapper-42">
                                      <input
                                        id="campaign"
                                        name="campaign"
                                        type="checkbox"
                                        checked={isChecked.campaign}
                                        onChange={handleCheckboxChange}
                                      />
                                      <label class="cbx" for="campaign"></label>
                                      <label class="lbl" for="campaign">
                                        Our any campaign
                                      </label>
                                    </div>
                                  </div>
                                </div>
                                {errors.checkbox && (
                                  <div className="invalid-feedback">
                                    {errors.checkbox}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="form-group position-relative">
                                <label>If Any Special Request ?</label>
                                <textarea
                                  name="message"
                                  id=""
                                  className={
                                    errors.message
                                      ? "form-control is-invalid"
                                      : "form-control"
                                  }
                                  rows="3"
                                  placeholder="Enter message"
                                  value={details.message}
                                  onChange={handleChange}
                                  style={{ resize: "none", height: "auto" }}
                                ></textarea>
                                {errors.message && (
                                  <div className="invalid-feedback">
                                    {errors.message}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group text-center m-0">
                                <button className="btn sub-btn">Submit</button>
                              </div>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WomansClub;
