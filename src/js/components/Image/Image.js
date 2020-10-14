import React from "react";

export default ({ src , alt='', onClick=()=>{}, onLoad, onError, className}) => {

  if (!src) {
    return null;
  }
  
  return (
    <>
      <img
        onClick={() => onClick()}
        src={src}
        alt={alt}
        onLoad={onLoad}
        onError={onError}
        className={`component-image ${className}`}
      />
    </>
  );
};
