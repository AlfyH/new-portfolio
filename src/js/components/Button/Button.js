import React from 'react';

export default ({ style, text, image }) =>{
  return (
    <div className="component-button" style={style}>
      <span className="component-text">{text}</span>
      <img className="component-image" src={image} alt={''} />
    </div>
  );
};
