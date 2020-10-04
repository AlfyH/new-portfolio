import React from 'react';
import Text from '../Text/Text';

let modalClassName = "component-modal-wrapper";
export default () => {
  return (
    <div className={modalClassName} id="component-modal">
      <div className="component-modal">
        <Text
          text={"Alfy Hushairi."}
          className={"font-overlay-title overlay-title"}
        />
        <Text
          text={"A Web Developer"}
          className={"font-overlay-title"}
        />
        <Text
          text={"working in London, UK."}
          className={"font-overlay-title"}
        />
        <Text
          text={`me@alfyhushairi.com`}
          className={"font-overlay-subtitle overlay-subtitle"}
        />
      </div>
    </div>
  );
};