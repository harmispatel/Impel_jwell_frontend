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
        <h1>Oops! Something went wrong.</h1>
        <p>We couldn't find the information you were looking for.</p>
        <p>
          Please try again later or go back to the <Link to="/">home page</Link>
          .
        </p>
        <img
          src="https://cdn.dribbble.com/userupload/5849501/file/original-71d511570d1fbbba81ff272abc7e99ae.png?resize=1600x1200"
          alt="Error"
          className="error-image w-100"
        />
      </div>
    </>
  );
};

export default Errorpage;
