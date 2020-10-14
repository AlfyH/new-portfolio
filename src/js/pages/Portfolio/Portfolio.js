import React from "react";
import Image from '../../components/Image/Image';
import { images } from '../../helpers';

const imageArray = [
  {
    image: images.image_one
  },
  {
    image: images.image_two
  },
  {
    image: images.image_three
  },
  {
    image: images.image_four
  },
  {
    image: images.image_five
  },
  {
    image: images.image_six
  },
  {
    image: images.image_seven
  },
  {
    image: images.image_eight
  }
];

export default () => {
  return (
    <div className="page-portfolio">
      <div className="grid-cont">
        {imageArray.map((item) => (
          <div key={item.image} className="grid-item">
            <Image 
              src={item.image}
              className="port-img"
              />
          </div>
        ))}
      </div>
    </div>
  );
};
