import React from "react";

export default ({ text, className, style, id }) => {
  const finalClassName = `component-text ${className}`
  return (
    <div className={finalClassName} style={style} id={id}>
      {text}
    </div>
  );
};
