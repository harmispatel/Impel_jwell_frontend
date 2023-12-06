import React from "react";

const About = () => {
  return (
    <section className="about-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-12">
            <div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            <div>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text. All the Lorem Ipsum generators on
                the Internet tend to repeat predefined chunks as necessary,
                making this the first true generator on the Internet. It uses a
                dictionary of over 200 Latin words, combined with a handful of
                model sentence structures, to generate Lorem Ipsum which looks
                reasonable. The generated Lorem Ipsum is therefore always free
                from repetition, injected humour, or non-characteristic words
                etc.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div class="form-main">
            <div class="main-wrapper">
              <h2 class="form-head">Contact Form</h2>
              <form class="form-wrapper">
                <div class="form-card">
                  <input
                    class="form-input"
                    type="text"
                    name="full_name"
                    required="required"
                  />
                  <label class="form-label" for="full_name">
                    Full Name
                  </label>
                </div>

                <div class="form-card">
                  <input
                    class="form-input"
                    type="email"
                    name="email"
                    required="required"
                  />
                  <label class="form-label" for="email">
                    Email
                  </label>
                </div>

                <div class="form-card">
                  <input
                    class="form-input"
                    type="number"
                    name="phone_number"
                    required="required"
                  />
                  <label class="form-label" for="phone_number">
                    Phone number
                  </label>
                </div>

                <div class="form-card">
                  <textarea
                    class="form-textarea"
                    maxlength="420"
                    rows="3"
                    name="phone_number"
                    required="required"
                  ></textarea>
                  <label class="form-textarea-label" for="phone_number">
                    Address
                  </label>
                </div>
                <div class="btn-wrap">
                  <button> Submit </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
