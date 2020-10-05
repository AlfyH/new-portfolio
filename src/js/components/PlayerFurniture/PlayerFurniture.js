import React from "react";
import Image from '../Image/Image';
import Text from "../Text/Text";
import { getScreenPosition, getScreenWidth, images } from "../../helpers";

export const formatDuration = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  if (time) {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  }

  return "00.00";
};

export default ({
  children
  }) => {
    const [ playBtn, infoBtn, gitBtn, linkedinBtn, playerBar ] = children;
    const getPlayerProgress = () => {
      let playerProgress = `0:00`;
      if (!isNaN((getScreenPosition() / getScreenWidth()).toFixed(2))) {
        playerProgress = (getScreenPosition() / getScreenWidth()).toFixed(2);
      }
      
      return playerProgress==='1.00' ? `1:00` : (playerProgress * 0.6).toFixed(2);
    };

  return (
    <div className="player-furniture-wrapper">
      <div className="rabbit-logo-wrapper">
        <Image src={images.rabbit_desktop} className="rabbit-logo" />
      </div>
      <div className="buttons-wrapper">
        {playBtn}
        {linkedinBtn}
        {gitBtn}
        {infoBtn}
      </div>
      <div className="player-bar-wrapper">{playerBar}</div>
      <Text
        className="font-player-bar player-bar-duration"
        text={`0${getPlayerProgress()} / 01:00`.replace(".", ":")}
      />
    </div>
  );
};
