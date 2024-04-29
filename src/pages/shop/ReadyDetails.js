import React from "react";
import { useParams } from "react-router-dom";

const ReadyDetails = () => {
  const { id } = useParams();
  return (
    <>
      <section>
        <div>
          <span>{id}</span>
        </div>
      </section>
    </>
  );
};

export default ReadyDetails;
