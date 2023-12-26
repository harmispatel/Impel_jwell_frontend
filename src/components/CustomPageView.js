import React, { useEffect, useState } from "react";
import profileService from "../services/Home";
import { useParams } from "react-router-dom";

const CustomPageView = () => {
  const paramId = useParams();
  const [pageDetails, setPageDetails] = useState([]);

  const CustomPages = () => {
    profileService
      .CustomPages({ page_slug: paramId })
      .then((res) => {
        setPageDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    CustomPages();
  }, []);

  return (
    <>
      <section className="wishlist">
        <div className="container">
          <div className="row">
            <div className="text-center">
              <h4>{pageDetails[0]?.name}</h4>
            </div>
            <div className="col-md-12">
              <div className="">
                <div
                  dangerouslySetInnerHTML={{ __html: pageDetails[0]?.content }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomPageView;
