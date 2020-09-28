import React from "react";
import Image from '../Image/Image';
import Text from "../Text/Text";
import { getScreenPosition, getScreenWidth, images } from "../../helpers";

export default ({
  children
  }) => {
    const [ playBtn, infoBtn, gitBtn, linkedinBtn, playerBar ] = children;
    const getPlayerProgress = () => {
      let playerProgress = `0:00`;

      if (!isNaN((getScreenPosition() / getScreenWidth()).toFixed(2))) {
        playerProgress = (getScreenPosition() / getScreenWidth()).toFixed(2);
      }
        return playerProgress;
    };

  return (
    <div className="player-furniture-wrapper">
      <div className="rabbit-logo-wrapper">
        <Image src={images.rabbit_desktop} className="rabbit-logo" />
      </div>
      <div className="buttons-wrapper">
        {playBtn}
        {infoBtn}
        {gitBtn}
        {linkedinBtn}
      </div>
      <div className="player-bar-wrapper">
        {playerBar}
        <Text
          className="font-player-bar"
          text={`0${getPlayerProgress()} / 01:00`.replace(".", ":")}
        />
        {/* <div className="player-bar-duration">
          {`0${getPlayerProgress()} / 01:00`.replace(".", ":")}
        </div> */}
      </div>
    </div>
  );
};
