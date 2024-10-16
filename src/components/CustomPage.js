import React, { useEffect, useState } from "react";
import profileService from "../services/Home";
import { Helmet } from "react-helmet-async";
import Loader from "./common/Loader";
import { useParams } from "react-router-dom";

const CustomPage = () => {
  const params = useParams();
  const [pageDetails, setPageDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const CustomPages = () => {
    setIsLoading(true);
    profileService
      .CustomPages({ page_slug: params?.id })
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
  }, [params?.id]);

  return (
    <>
      <Helmet>
        <title>
          Impel Store -
          {pageDetails?.name && pageDetails?.name ? pageDetails?.name : ""}
        </title>
      </Helmet>
      <section className="custom-pages">
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
                  {params?.id === "about-us" && (
                    <img src={pageDetails?.image} alt="" className="w-100" />
                  )}
                </div>
                <div className="col-md-12">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: pageDetails?.content,
                    }}
                  />
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
