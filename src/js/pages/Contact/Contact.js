import React from "react";
// import video from '../../../assets/waiting_wishing.mp4';
import video from "../../../assets/waiting_wishing.gif";

export default () => {
  return (
    <div className="page-contact">
      {/* <video
        className="video-cover"
        src={video}
        autoPlay
        loop
        playsInline
        muted
      /> */}
      <img className="video-cover" src={video} />
    </div>
  );
};
