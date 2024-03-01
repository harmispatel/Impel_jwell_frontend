import React from "react";
import { Loader } from "rsuite";

const Loading = () => {
  return (
    <>
      {/* <Loader size="lg" /> */}
      <div class="diamondCon">
        <ul class="diamond">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div class="textCon">Impel</div>
      </div>
    </>
  );
};

export default Loading;
