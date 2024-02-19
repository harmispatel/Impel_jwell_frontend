import React, { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";

const GoTop = () => {
  const [backButton, setBackButton] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setBackButton(true);
      } else {
        setBackButton(false);
      }
    });
  }, []);

  const scrollup = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {backButton && (
        <button className="btn go-top-button" onClick={scrollup}>
          <FaAngleUp style={{ color: "#fff" }} />
        </button>
      )}
    </div>
  );
};

export default GoTop;
