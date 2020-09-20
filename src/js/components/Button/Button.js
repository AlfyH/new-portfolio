import React from 'react';

export default ({ style, text, image, onClick }) =>{
  return (
    <div 
      className="component-button" 
      style={style}
      onClick={() => onClick()}
      >
      <span className="component-text">{text}</span>
      <img className="component-image" src={image} alt={''} />
    </div>
  );
};
