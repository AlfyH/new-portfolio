import React from "react";
import $ from 'jquery';
import PlayerBar from '../PlayerBar/PlayerBar';
import Button from '../Button/Button';
import { getScreenPosition, getScreenWidth, setScreenPosition } from "../../helpers";

const player = {
  timer: null
}

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

  return (
    <div className="player-furniture-wrapper">
      <Button
        text="Play"
        style={{
          width: "3vw",
          height: "3vw",
          gridArea: "button1",
        }}
        onClick={() => {
          let interval = getScreenPosition();
          if (player.timer) {
            clearInterval(player.timer);
            delete player.timer;
          }
          player.timer = setInterval(() => {
            setScreenPosition(interval);
            interval = interval + 10;
          }, 100);
        }}
      />
      <Button
        text="Pause"
        style={{
          width: "3vw",
          height: "3vw",
          gridArea: "button2",
        }}
        onClick={() => {
          clearInterval(player.timer);
          if (player.timer) {
            delete player.timer;
          }
          console.log(player.timer);
        }}
      />
      <Button
        text="Info"
        style={{
          width: "3vw",
          height: "3vw",
          gridArea: "button3",
        }}
        onClick={() => {
          $("#component-modal").show();
          console.log('open modal');
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
      <span style={{ gridArea: "playduration" }}>
        {`0${getPlayerProgress()} / 01:00`.replace(".", ":")}
      </span>
    </div>
  );
};
