import React, {useState, useEffect, useCallback} from 'react';
import Modal from '../components/Modal/Modal';
import PlayerBar from '../components/PlayerBar/PlayerBar';
import Button from '../components/Button/Button';
import $ from 'jquery';
import { getScreenPosition, setScreenPosition, images } from "../helpers";

import PlayerFurniture from '../components/PlayerFurniture/PlayerFurniture';

const player = {
  timer: null
}

export default ({ children }) => {
  const [ value, setValue ] = useState(0);
  const [ state, setState] = useState('None');

  const handleScrubStart = x => {
    setValue(x);
    setState('Scrub Start')
  }

  const handleScrubEnd = x => {
    setValue(x);
    setState('Scrub End')
  }

  const handleScrubChange = x => {
    setState('Scrub Change')
  }

  const updateBarOnScroll = useCallback(() => {
    console.log("screen position", $("#outer-wrapper").scrollTop());
    setValue($("#outer-wrapper").scrollTop());
  }, []);

  useEffect(() => {
    document
      .getElementById("outer-wrapper")
      .addEventListener("scroll", updateBarOnScroll);

    return () =>
      document
        .getElementById("outer-wrapper")
        .removeEventListener("scroll", updateBarOnScroll);
  }, [updateBarOnScroll]);

  useEffect(() => {
    // console.log('state', state);
    // console.log("screen position", getScreenPosition());
    // console.log("screen width", getScreenWidth());
    // console.log("bar value", value);
    // console.log("screen percentage", `0${(getScreenPosition() / getScreenWidth()).toFixed(2)} / 01.00`.replace('.', ':'));
  }, [state, value]);

  return (
    <div className="app-wrapper">
      <Modal />
      {children}
      <PlayerFurniture
        handleScrubStart={handleScrubStart}
        handleScrubEnd={handleScrubEnd}
        handleScrubChange={handleScrubChange}
        value={value}
      >
        <Button
          image={images.play_unfocused}
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
          image={images.info_unfocused}
          className="other-buttons"
          onClick={() => {
            clearInterval(player.timer);
            if (player.timer) {
              delete player.timer;
            }
            console.log(player.timer);
          }}
        />
        <Button
          image={images.github_unfocused}
          className="other-buttons"
          onClick={() => {
            $("#component-modal").show();
            console.log("open modal");
          }}
        />
        <Button
          image={images.linkedin_unfocused}
          className="other-buttons"
          onClick={() => {}}
        />
        <PlayerBar
          min={0}
          max={($("#inner-wrapper").width() * 2) / 3}
          value={value}
          onScrubStart={handleScrubStart}
          onScrubEnd={handleScrubEnd}
          onScrubChange={handleScrubChange}
        />
      </PlayerFurniture>
    </div>
  );
};