import React from "react";
import $ from 'jquery';
import PlayerBar from '../PlayerBar/PlayerBar';
import Button from '../Button/Button';
import { getScreenPosition, getScreenWidth } from "../../helpers";

export default ({
  handleScrubStart,
  handleScrubEnd,
  handleScrubChange,
  value
  }) => {
    const getPlayerProgress = () => {
      let playerProgress = `0:00`;

      if (!isNaN((getScreenPosition() / getScreenWidth()).toFixed(2))) {
        playerProgress = (getScreenPosition() / getScreenWidth()).toFixed(2);
      }
        return playerProgress;
    };

    console.log("screen position", getScreenPosition());
    console.log("screen width", getScreenWidth());
    console.log("bar value", value);
    console.log(
      "screen percentage",
      `0${getPlayerProgress()} / 01.00`.replace(".", ":")
    );

  return (
    <div className="player-furniture-wrapper">
      <Button 
        text="Play"
        style={{
          width:"3vw",
          height:"3vw"
        }}
      />
      <PlayerBar
        min={0}
        max={($("#inner-wrapper").width() * 2) / 3}
        value={value}
        onScrubStart={handleScrubStart}
        onScrubEnd={handleScrubEnd}
        onScrubChange={handleScrubChange}
      />
      {`0${getPlayerProgress()} / 01:00`.replace(".", ":")}
    </div>
  );
};
