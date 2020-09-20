import React from "react";

export default ({ text, className, style, id }) => {
  return (
    <span
      className={className}
      style={style}
      id={id}
    >
      {text}
    </span>
  );
};
