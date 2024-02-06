import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Errorpage = () => {
  return (
    <>
      <Helmet>
        <title>Impel Store - Not found URL</title>
      </Helmet>
      <div className="container">
        <div class="utility-page-wrap">
          <div class="utility-page-content">
            <h1 class="error-title">404</h1>
            <h3>Page Not Found</h3>
            <div class="error-description">
              The page you are looking for doesn't exist or has been moved
            </div>
            <Link to="/" class="dark-button w-button">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Errorpage;
