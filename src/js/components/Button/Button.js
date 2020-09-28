import React from 'react';
import Image from '../Image/Image';
import Text from '../Text/Text';

export default ({ className , style, text, image, onClick }) =>{
  return (
    <div 
      className={`component-button ${className}`}
      style={style}
      onClick={() => onClick()}
      >
      <Text 
      text={text}
      />
      <Image 
        className="component-image"
        src={image} 
        alt={''} 
      />
    </div>
  );
};
