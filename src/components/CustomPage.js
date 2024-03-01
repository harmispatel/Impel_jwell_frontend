import React, { useEffect, useState } from "react";
import profileService from "../services/Home";
import { Helmet } from "react-helmet-async";
import Loader from "./common/Loader";

const CustomPage = ({ page_slug }) => {
  const paramId = page_slug;
  const [pageDetails, setPageDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const CustomPages = () => {
    setIsLoading(true);
    profileService
      .CustomPages({ page_slug: paramId })
      .then((res) => {
        setPageDetails(res?.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(true);
      });
  };

  useEffect(() => {
    CustomPages();
  }, [paramId]);

  return (
    <>
      <Helmet>
        <title>
          Impel Store -
          {pageDetails?.name && pageDetails?.name ? pageDetails?.name : ""}
        </title>
      </Helmet>
      <section className="wishlist">
        {isLoading ? (
          <div className="animation-loading">
            <Loader />
          </div>
        ) : (
          <>
            <div className="container">
              <div className="row">
                <div className="text-center">
                  <h1>{pageDetails?.name}</h1>
                </div>
                <div className="text-center mt-3 mb-3">
                  {page_slug === "about-us" && (
                    <img src={pageDetails?.image} alt="" className=" w-75" />
                  )}
                </div>
                <div className="col-md-12">
                  <div className="">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: pageDetails?.content,
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default CustomPage;
