import React from "react";
// import Text from "../../components/Text/Text";
import Image from "../../components/Image/Image";
import { images } from "../../helpers";

export default () => {
  return (
    <div className="page-about">
      {/* <Text
        text="I am a web developer formerly trained in mechatronics. I began my career working in museums as an engineer and have since provided my services through adhoc museum integrations and equipment rental. I enjoy the process of designing, prototyping and developing web applications and physical installations.
I am ready to collaborate."
      /> */}
      <Image 
        src={images.me_bg_desktop}
        className='image-me-bg'
      />
    </div>
  );
};
