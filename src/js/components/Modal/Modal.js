import React from 'react';
import Button from '../Button/Button';
import Text from '../Text/Text';
import images from '../../helpers/importImages';

let modalClassName = "component-modal-wrapper";
export default ({ setIsModalShowing }) => {
  return (
    <div className={modalClassName} id="component-modal">
      <div className="component-modal">
        <Button
          onClick={() => {
            setIsModalShowing(false);
          }}
          image={images.close}
          imageClassName="close-image"
          className="button-close-image"
        />
        <Text
          text={"Alfy Hushairi."}
          className={"font-overlay-title overlay-title"}
        />
        <Text text={"A Web Developer"} className={"font-overlay-title"} />
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