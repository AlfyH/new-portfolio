import React from 'react';
import string from "../../../configs/strings.json";
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
          text={string.contact.header1}
          className={"font-overlay-title overlay-title"}
        />
        <Text text={string.contact.header2} className={"font-overlay-title"} />
        <Text
          text={string.contact.header3}
          className={"font-overlay-title"}
        />
        <Text
          text={string.contact.email}
          className={"font-overlay-subtitle overlay-subtitle"}
        />
      </div>
    </div>
  );
};