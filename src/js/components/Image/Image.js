import React from "react";

export default ({ src , alt='', onLoad, onError, className}) => {

  if (!src) {
    return null;
  }
  
  return (
    <>
      <img 
        src={src}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        className={`component-image ${className}`}
      />
    </>
  );
};
