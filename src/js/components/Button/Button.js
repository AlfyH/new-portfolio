import React from 'react';
import Image from '../Image/Image';

export default ({ className , style, text, image, onClick }) =>{
  return (
    <div 
      className={`component-button ${className}`}
      style={style}
      onClick={() => onClick()}
      >
      <span className="component-text">{text}</span>
      <Image 
        className="component-image"
        src={image} 
        alt={''} 
      />
    </div>
  );
};
