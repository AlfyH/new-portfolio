import React, {useState, useEffect, useCallback} from 'react';
import Modal from '../components/Modal/Modal';
import PlayerBar from '../components/PlayerBar/PlayerBar';
import Image from "../components/Image/Image";
import Button from '../components/Button/Button';
import $ from 'jquery';
import useWindowSize from '../hooks/useWindowSize';
import { getScreenPosition, setScreenPosition, images, getScreenWidth } from "../helpers";

import PlayerFurniture from '../components/PlayerFurniture/PlayerFurniture';

const player = {
  timer: null
}
let last_known_scroll_position = 0;

export default ({ children }) => {
  const [ value, setValue ] = useState(0);
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ isModalShowing, setIsModalShowing] = useState(false);
  const [ isAppLoaded, setIsAppLoaded ] = useState(false);
  const size = useWindowSize();

  window.onload = () => {
    setIsAppLoaded(true);
  };

  const handleScrubStart = x => {
    setScreenPosition(x);
    setValue(x);
    if (player.timer) {
      setIsPlaying(!isPlaying);
      clearInterval(player.timer);
      delete player.timer;
    }
  }

  const handleScrubEnd = x => {
    setScreenPosition(x);
    setValue(x);
  }

  const handleScrubChange = x => {
  }

  const updateBarOnScroll = useCallback(() => {
    if ((getScreenPosition() === getScreenWidth()) && isAppLoaded) {
      setIsModalShowing(true);
    }
    if (
      0.9 <= getScreenPosition() / getScreenWidth() &&
      getScreenPosition() / getScreenWidth() <1
    ) {
      setIsModalShowing(false);
    }
    if (
      $("#outer-wrapper").scrollTop() > last_known_scroll_position + 10 ||
      $("#outer-wrapper").scrollTop() < last_known_scroll_position + 10
    ) {
      if (player.timer) {
        setIsPlaying(!isPlaying);
        clearInterval(player.timer);
        delete player.timer;
      }
    }

    last_known_scroll_position = $("#outer-wrapper").scrollTop();
    setValue($("#outer-wrapper").scrollTop());
  }, [isAppLoaded, isPlaying]);

  useEffect(() => {
    document
      .getElementById("outer-wrapper")
      .addEventListener("scroll", updateBarOnScroll);

    return () =>
      document
        .getElementById("outer-wrapper")
        .removeEventListener("scroll", updateBarOnScroll);
  }, [updateBarOnScroll]);

  // useEffect(() => {
  //   console.log("screen position", getScreenPosition());
  //   console.log("screen width", getScreenWidth());
  //   console.log("bar value", value);
  //   console.log("screen percentage", `0${(getScreenPosition() / getScreenWidth()).toFixed(2)} / 01.00`.replace('.', ':'));
  // }, [value]);

  const playerAction = {
    play: () => {
      setIsPlaying(!isPlaying);
      let interval = getScreenPosition();
      if (player.timer) {
        clearInterval(player.timer);
        delete player.timer;
      }
      player.timer = setInterval(() => {
        setScreenPosition(interval);
        interval = interval + 10;
      }, 100);
    },
    pause: () => {
      setIsPlaying(!isPlaying);
      clearInterval(player.timer);
      if (player.timer) {
        delete player.timer;
      }
    }
  };

  return (
    <div
      className="app-wrapper"
      style={{ height: size.height }}
      // style={{ height: $(window).height() }}
      // style={{ height: window.innerHeight }}
    >
      {isModalShowing && <Modal setIsModalShowing={setIsModalShowing} />}
      <div
        className={isModalShowing ? "blur" : ""}
        onClick={() => setIsModalShowing(false)}
      >
        {children}
      </div>
      {getScreenPosition() === 0 && <Image 
        src={images.right}
        className={"right-button"}
        onClick={() => {
          setScreenPosition(window.innerWidth * 0.4, true);
        }}
      />}
      <PlayerFurniture>
        <Button
          image={getScreenPosition() === getScreenWidth() ? images.restart_focused : isPlaying ? images.pause_focused : images.play_focused}
          onClick={() =>
            getScreenPosition() === getScreenWidth() ? setScreenPosition(0, true) : isPlaying ? playerAction.pause() : playerAction.play()
          }
        />
        <Button
          image={images.info_focused}
          className="other-buttons"
          onClick={() => {
            isModalShowing ? setIsModalShowing(false) : setIsModalShowing(true);
          }}
        />
        <Button
          image={images.github_focused}
          className="other-buttons"
          onClick={() => {
            window.open("https://github.com/AlfyH/new-portfolio", "_blank");
          }}
        />
        <Button
          image={images.linkedin_focused}
          className="other-buttons"
          onClick={() => {
            window.open("https://www.linkedin.com/in/alfyhushairi", "_blank");
          }}
        />
        <PlayerBar
          min={0}
          max={getScreenWidth()}
          value={value}
          onScrubStart={handleScrubStart}
          onScrubEnd={handleScrubEnd}
          onScrubChange={handleScrubChange}
        />
      </PlayerFurniture>
    </div>
  );
};