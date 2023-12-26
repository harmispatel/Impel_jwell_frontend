import React, { useEffect, useRef } from "react";
import video1 from "../assets/video/video.mp4";

const Errorpage = () => {
  const videoEl = useRef(null);

  const attemptPlay = () => {
    videoEl &&
      videoEl.current &&
      videoEl.current.play().catch((error) => {
        console.error("Error attempting to play", error);
      });
  };
  useEffect(() => {
    attemptPlay();
  }, []);

  return (
    <>
      <div>
        <video
          style={{
            maxWidth: "100%",
            width: "100%",
            height: "660px",
            margin: "0 auto",
            backgroundColor: "black",
            border: "none",
          }}
          playsInline
          loop
          muted
          controls
          alt="All the devices"
          src={video1}
          ref={videoEl}
        />
      </div>
    </>
  );
};

export default Errorpage;
