import React from "react";

export default ({ text, list, className, style, id, isList }) => {
  const finalClassName = `component-text ${className}`
  const returnList = () => {
    return (
      <ul>
        {
          list.map(item => (
          <li key={item}>
            {item}
          </li>
        ))}
      </ul>
    )
  }
  return (
    <div className={finalClassName} style={style} id={id}>
      {text}
      {isList && returnList()}
    </div>
  );
};
