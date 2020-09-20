import React from "react";

export default ({ style, src , alt='', onLoad, onError, className}) => {
  return (
    <div className="component-image" style={style}>
      <img 
        src={src}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        className={className}
      />
    </div>
  );
};
